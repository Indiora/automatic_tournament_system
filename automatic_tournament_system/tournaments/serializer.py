from rest_framework import serializers
from .models import Tournament, Bracket
from .utils import SingleElimination, RoundRobin, clear_participants
from rest_framework.parsers import JSONParser
from profiles.models import Profile
import io
import json


#CurrentUserDefault ?
class TournamentSerializer(serializers.ModelSerializer):
    slug = serializers.CharField(required=False)
    owner = serializers.StringRelatedField(required=False) 
    start_time = serializers.DateTimeField(format='%Y-%m-%dT%H:%M')
    class Meta:
        model = Tournament
        fields = ['id', 'slug', 'title', 'content', 'participants', 'poster', 'game', 'prize', 'created_at', 'start_time', 'owner']  

    def create(self, validated_data):
        tournament_tree = SingleElimination(clear_participants(validated_data.get('participants')))
        tournament = Tournament.objects.create(**validated_data, owner=Profile.objects.get(user__email=self.initial_data.get('creater_email')))
        Bracket.objects.create(tournament=tournament, bracket=tournament_tree.create_bracket(), type=self.initial_data.get('type'))
        return tournament


class BracketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bracket
        fields = "__all__"

    def create(self, validated_data):
        # initial_data потому что нету в модули Bracket, а передаеться как дополнительное поле
        if validated_data.get('type') == 'SE':
            tournament_tree = SingleElimination(clear_participants(self.initial_data.get('participants')))
            bracket = Bracket.objects.create(bracket=tournament_tree.create_bracket(), type=validated_data.get('type'))
        elif validated_data.get('type') == 'RR':
            round_robin = RoundRobin(clear_participants(self.initial_data.get('participants')))
            print(round_robin.create_round_robin_bracket())
            bracket = Bracket.objects.create(bracket=round_robin.create_round_robin_bracket(), type=validated_data.get('type'))
            print(bracket)

        return bracket 

    def update(self, instance, validated_data): 
        RoundRobin.replace(self.initial_data.get('id'), self.initial_data, instance.bracket)
        return super().update(instance, validated_data)


class BracketsField(serializers.RelatedField):

    def to_representation(self, value):
        return {'id': value.id, 'type': value.type, 'bracket': value.bracket, }



class AllBracketSerealizer(serializers.ModelSerializer):
    brackets = BracketsField(many=True, read_only=True)
    

    class Meta:
        model = Tournament
        fields = ['brackets']  
