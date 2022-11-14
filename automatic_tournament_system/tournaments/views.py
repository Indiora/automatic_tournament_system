from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse
from django.views.generic import TemplateView, DetailView, ListView
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.edit import FormView, FormMixin, CreateView, UpdateView
from rest_framework import generics

from .forms import TournamentForm, BracketFormset, BracketForm
from .models import Tournament, Bracket
from .serializer import TournamentSerializer
from .utils import clear_participants

class HomeView(TemplateView):
    template_name = 'tournaments/home.html'


class TournamentView(DetailView):
    model = Tournament
    template_name = 'tournaments/tournament.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = self.object.title
        context['tor'] = range(2)
        return context


class TournamentsView(ListView):
    model = Tournament
    paginate_by = 9
    context_object_name = 'tournaments'
    template_name = 'tournaments/tournaments.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'All Tournaments'
        return context


class TournamentAPIView(generics.RetrieveUpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer


class TournamentCreateView(CreateView):
    form_class = TournamentForm
    template_name = 'tournaments/create_tournament.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['bracket_formset'] = BracketFormset()
        return context

    def post(self, request, *args, **kwargs):
        self.object = None
        # form_class = self.get_form_class()
        form = self.get_form(self.form_class)
        bracket_formset = BracketFormset(self.request.POST, self.request.FILES)
        if form.is_valid() and bracket_formset.is_valid():
            return self.form_valid(form, bracket_formset)
        else:
            return self.form_invalid(form, bracket_formset)

    def form_valid(self, form, bracket_formset):
        self.object = form.save(commit=False)
        self.object.save()
        print(clear_participants(self.object.content))
        # saving ProductMeta Instances
        bracket_formsets = bracket_formset.save(commit=False)
        for bracket in bracket_formsets:
            bracket.tournament = self.object
            bracket.save()
        return redirect(reverse_lazy('tournament', kwargs={'slug': self.object.slug}))

    def form_invalid(self, form, bracket_formset):
        return self.render_to_response(
            self.get_context_data(form=form, bracket_formset=bracket_formset)
        )


class TournamentEdit(UpdateView):
    model = Tournament
    template_name = 'tournaments/edit_tournament.html'
    form_class = TournamentForm

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        if self.request.POST:
            data["bracket_formset"] = BracketFormset(self.request.POST, self.request.FILES, instance=self.object)
        else:
            data["bracket_formset"] = BracketFormset(instance=self.object)
        return data

    def form_valid(self, form):
        context = self.get_context_data()
        bracket_formset = context["bracket_formset"]
        self.object = form.save()
        if bracket_formset.is_valid():
            bracket_formset.tournament = self.object
            bracket_formset.save()
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('tournament', kwargs={'slug': self.object.slug})


class TournamentSearch(ListView):
    template_name = 'tournaments/search.html'
    context_object_name = 'tournaments'
    paginate_by = 4

    def get_queryset(self):
        return Tournament.objects.filter(title__icontains=self.request.GET.get('search'))

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['search'] = f"search={self.request.GET.get('search')}&"
        context['title'] = "Search"
        return context