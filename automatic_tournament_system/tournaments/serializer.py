from rest_framework import serializers
from .models import Tournament, Bracket


class TournamentSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    content_x = serializers.CharField(source='bracket.type', default='default content' )
    slug = serializers.CharField()


class BracketSerializer(serializers.ModelSerializer):
  class Meta:
      model = Bracket
      fields = "__all__"


