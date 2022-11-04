from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView

from .models import Tournament
from .serializer import TournamentSerializer

# from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly

# class TournamentsAPIList(generics.ListCreateAPIView):
#     queryset = Tournament.objects.all()
#     serializer_class = TournamentSerializer


class TournamentAPI(generics.RetrieveAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    lookup_field = 'slug'


class TournamentsViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()
    lookup_field = 'slug'