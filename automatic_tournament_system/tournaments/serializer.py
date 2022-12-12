from rest_framework import serializers
from .models import Tournament, Bracket
from .utils import Tree, clear_participants
import json


# class TournamentSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=255)
#     content = serializers.CharField()
#     slug = serializers.CharField(required=False)
#     participants = serializers.CharField()
#     game = serializers.CharField()
#     prize = serializers.IntegerField()


class TournamentSerializer(serializers.ModelSerializer):
    slug = serializers.CharField(required=False)

    class Meta:
        model = Tournament
        fields = "__all__"  

    def create(self, validated_data):
        tournament_tree = Tree(clear_participants(validated_data.get('participants')))
        tournament = Tournament.objects.create(**validated_data)
        Bracket.objects.create(tournament=tournament, bracket=tournament_tree.create_bracket(), type='SE')
        return tournament


class BracketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bracket
        fields = "__all__"

    def create(self, validated_data):
        tournament_tree = Tree(clear_participants(self.initial_data.get('participants')))
        print(clear_participants(self.initial_data.get('participants')))
        bracket = Bracket.objects.create(bracket=tournament_tree.create_bracket(), type='SE')
        return bracket

