from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers

from .views import HomeView, TournamentView, TournamentCreateView, TournamentsView, TournamentEdit
from .api_views import TournamentsViewSet, TournamentAPI


router = routers.DefaultRouter()
router.register(r"tournament", TournamentsViewSet)
print(router.urls)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('tournament/', TournamentCreateView.as_view(), name='create_tournament'),
    path('tournaments/', TournamentsView.as_view(), name='tournaments'),
    path('tournament/<str:slug>/', TournamentView.as_view(), name='tournament'),
    path('tournament_edit/<str:slug>/', TournamentEdit.as_view(), name='tournament_edit'),
    # path('api/v1/tournament/<int:pk>', TournamentAPIView.as_view())
    # path('api/v1/tournaments/', TournamentsViewSet.as_view({'get': ''})),
    # path('api/v1/tournaments/<str:slug>/', TournamentsViewSet.as_view({'get': 'retrieve'})),
    # path('api/v1/tournaments/<str:slug>/', TournamentsViewSet.as_view({'post': 'create'})),
    # path('api/v1/tournament/<str:slug>/', TournamentAPI.as_view())
    path('api/v1/', include(router.urls))
]