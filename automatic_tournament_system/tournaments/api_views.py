from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.views import APIView

from .models import Tournament, Bracket
from .serializer import TournamentSerializer, BracketSerializer, AllBracketSerealizer

# from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 1000


class TournamentsAPIList(generics.ListCreateAPIView):
    queryset = Tournament.objects.all().order_by('id')
    serializer_class = TournamentSerializer
    pagination_class = LargeResultsSetPagination


class TournamentAPIView(generics.RetrieveAPIView): 
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    lookup_field = 'slug'


class TournamentCreateView(generics.CreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer


class AllBracketAPIView(generics.RetrieveAPIView): 
    queryset = Tournament.objects.all()
    serializer_class = AllBracketSerealizer
    lookup_field = 'slug'


class BracketCreateView(generics.CreateAPIView):
    queryset = Bracket.objects.all()
    serializer_class = BracketSerializer


class BracketAPIView(generics.RetrieveAPIView):
    queryset = Bracket.objects.all()
    serializer_class = BracketSerializer
    lookup_field = 'id'