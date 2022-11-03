from django import forms
from .models import Tournament, Bracket
from django.utils.text import slugify
from django.forms.models import inlineformset_factory


class TournamentForm(forms.ModelForm):
    class Meta:
        model = Tournament
        fields = ('title', 'content')


class BracketForm(forms.ModelForm):
    class Meta:
        model = Bracket
        fields = ('type',)


BracketFormset = inlineformset_factory(
    Tournament, Bracket, form=BracketForm, extra=1,
)
