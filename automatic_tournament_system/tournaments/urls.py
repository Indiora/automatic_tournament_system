from django.urls import path, include
from django.views.generic import TemplateView

from .views import HomeView, TournamentView, TournamentCreateView, TournamentAPIView, TournamentsView, TournamentEdit


urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('tournament/', TournamentCreateView.as_view(), name='create_tournament'),
    path('tournaments/', TournamentsView.as_view(), name='tournaments'),
    path('tournament/<str:slug>/', TournamentView.as_view(), name='tournament'),
    path('tournament_edit/<str:slug>/', TournamentEdit.as_view(), name='tournament_edit'),
    # path('api/v1/tournament/<int:pk>', TournamentAPIView.as_view())
]