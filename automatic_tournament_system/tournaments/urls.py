from django.urls import path, include
from django.views.generic import TemplateView


from .views import HomeView, TournamentView, TournamentCreateView, TournamentsView, TournamentEdit, TournamentSearch
from .api_views import TournamentUpdateApiView, TournamentsAPIList, TournamentAPIView, TournamentCreateView, BracketAPIView, BracketCreateView, AllBracketAPIView, TournamentDeleteAPIView




urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('tournament/', TournamentCreateView.as_view(), name='create_tournament'),
    path('tournaments/', TournamentsView.as_view(), name='tournaments'),
    path('tournament/<str:slug>/', TournamentView.as_view(), name='tournament'),
    path('tournament_edit/<str:slug>/', TournamentEdit.as_view(), name='tournament_edit'),
    path('search/', TournamentSearch.as_view(), name='search'),
    path('api/v1/tournament/<str:slug>/', TournamentAPIView.as_view()),
    path('api/v1/edit_tournament/<str:slug>/', TournamentUpdateApiView.as_view()),
    path('api/v1/delete_tournament/<str:slug>/', TournamentDeleteAPIView.as_view()),
    path('api/v1/tournaments/', TournamentsAPIList.as_view()),
    path('api/v1/create_tournament/', TournamentCreateView.as_view()),
    path('api/v1/bracket/<int:id>/', BracketAPIView.as_view()),
    path('api/v1/create_bracket/', BracketCreateView.as_view()),
    path('api/v1/tournament_brackets/<str:slug>/', AllBracketAPIView.as_view(), name='tournament_brackets')
    # path('api/v1/tournaments/<str:slug>/', TournamentsViewSet.as_view({'get': 'retrieve'})),
    # path('api/v1/tournaments/<str:slug>/', TournamentsViewSet.as_view({'post': 'create'})),
    # path('api/v1/tournament/<str:slug>/', TournamentAPI.as_view())

]