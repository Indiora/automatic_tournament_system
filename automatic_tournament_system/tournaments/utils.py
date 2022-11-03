import re


def clear_participants(participants):
    return [i.strip() for i in re.split('\\r\\n', participants)]

# -*- coding: utf-8 -*-
"""
round_robin.py
written by Stephen R. Ferg
placed in the public domain 2021-10-01

A Python program to generate round-robin schedules
for up to NUMBER_OF_TEAMS teams.
It uses the Circle algorithm described in
https://en.wikipedia.org/wiki/Round-robin_tournament

Output is written to the console.
"""
import random

##################################################
#  CUSTOMIZABLE SETTINGS
##################################################
# Customize the value for NUMBER_OF_TEAMS.
# Specify an even number, not an odd number.
NUMBER_OF_TEAMS = 4
##################################################
#  CUSTOMIZABLE SETTINGS: end
##################################################


COMPETITIONS = []
TERRAINS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
HEADINGS = ["WIN?", "OUR SCORE", "OPPONENTS", "DIFF"]

UNDERSCORES = "_" * 4
COLUMN_SEPARATOR = " " * 2
COLUMN_HEAD = ""
RESULTS_LINE = ""
COLUMN_WIDTH = 9

NEW_PAGE_SYMBOL = "[]"
BANNER_CHARACTER = "#"
BANNER_LINE_LEN = 65
BANNER_LINE = BANNER_CHARACTER * BANNER_LINE_LEN

trash, there_is_an_odd_number_of_teams = divmod(NUMBER_OF_TEAMS, 2)
if there_is_an_odd_number_of_teams:
    raise Exception("Number of teams must be an even number. Number of teams: "
                    + str(NUMBER_OF_TEAMS))
def strr(*args):
    x = [str(arg) for arg in args]
    y = "".join(x)
    return y

def say(*args):
    print(strr(*args))

class Competition:
    def __init__(self, numberOfTeams):
        self.numberOfTeams = numberOfTeams
        self.numberOfRounds = self.numberOfTeams - 1
        self.gamesPerRound = self.numberOfTeams // 2

        self.teams = []
        self.rounds = []

        self.generate_teams_in_competition()
        self.generate_rounds_in_competition()

    def generate_teams_in_competition(self):
        self.teams = []
        for i in range(self.numberOfTeams):
            team_id = i + 1
            team = Team(team_id, self)
            self.teams.append(team)

    def generate_rounds_in_competition(self):
        self.rounds = []
        for i in range(self.numberOfRounds):
            round_id = i + 1
            round = Round(round_id, self)
            self.rounds.append(round)
            self.turn()

    def turn(self):
        first = self.teams[0]
        last = self.teams[-1]
        middle = self.teams[1:-1]

        newList = [first, last]
        newList.extend(middle)
        self.teams = newList

    def print_rounds_in_competition(self):
        ### say()
        for round in self.rounds:
            say()
            for game in round.games:
                say(game.toString())
class Round:
    def __init__(self, round_id, competition):
        self.round_id = round_id
        self.competition = competition
        self.games = []

        teams = self.competition.teams
        for i in range(self.competition.gamesPerRound):
            # make one game
            game_id = i + 1
            # get terrain id

            round = self
            game = Game(self.competition, round, game_id)

            offsetFromStartOfTeamsList = i
            offsetFromEndOfTeamsList = len(teams) - 1 - offsetFromStartOfTeamsList
            team1 = teams[offsetFromStartOfTeamsList]
            team2 = teams[offsetFromEndOfTeamsList]
            game.assign_teams_to_game(team1, team2)

            self.games.append(game)

        self.games = sorted(self.games)  # keep the list sorted

    def get_printable_games_in_round(self):
        x = []
        for game in self.games:
            s = game.toString()
            x.append(s)
        return x

class Game:
    def __init__(self, competition, round, game_id):
        self.game_id = game_id
        self.competition = competition
        self.round = round

        self.team1 = None
        self.team2 = None

    def assign_teams_to_game(self, team1, team2):
        # aesthetics: put lowest team id number on left
        if team1.team_id < team2.team_id:
            self.team1, self.team2 = team1, team2
        else:
            self.team1, self.team2 = team2, team1

        team1.add_game_to_team_schedule(self)
        team2.add_game_to_team_schedule(self)

    def __lt__(self, other):
        if self.team1.team_id < other.team1.team_id:
            return True
        else:
            return False

class Team:
    def __init__(self, id, competition):
        self.team_id = id
        self.competition = competition
        self.rounds = []
        self.opponents_dict = {}
        self.game_terrains = {}

    def add_game_to_team_schedule(self, game):
        # we assume that rounds will be added sequentially
        round_id = game.round.round_id

        if game.team1.team_id == self.team_id:
            opponent = game.team2
        else:
            opponent = game.team1

        if round_id in self.opponents_dict:
            pass
        else:
            self.opponents_dict[round_id] = opponent
            self.rounds.append(round_id)

    def get_opponents_for_rounds(self):
        x = []
        for round_id in self.rounds:
            terrain = self.game_terrains[round_id]
            opponent = self.opponents_dict[round_id]
            s = str(opponent.team_id).rjust(2)


            x.append(s)
        return x

    def __lt__(self, other):
        if self.team_id < other.team_id:
            return True
        else:
            return False

def generate_1_competition(numberOfTeams):
    competition = Competition(numberOfTeams)
    competition.generate_rounds_in_competition()
    COMPETITIONS.append(competition)
    print(competition.print_rounds_in_competition())


def generate_competitions():
    for numberOfTeams in range(1, NUMBER_OF_TEAMS + 1):
        if numberOfTeams == 0:
            # an odd number of teams
            continue
        else:
            generate_1_competition(numberOfTeams)


if __name__ == "__main__":
   generate_competitions()