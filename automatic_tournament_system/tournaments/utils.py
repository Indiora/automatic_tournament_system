import re
import math
import secrets


def clear_participants(participants):
    return [i.strip() for i in re.split(r'[\n\r]+', participants)]


class newNode:
	def __init__(self, data, parent):
		self.data = data
		self.parent = parent
		self.left = self.right = None
       
class SingleElimination:
    def __init__(self, participants):
        self.participants = participants
        self.root = None
        self.bracket = []

    def single_el_number_of_rounds(self):
        return math.ceil(math.log2(len(self.participants)))


    def single_el_number_of_matches(self):
        return 2 ** self.single_el_number_of_rounds() - 1
    
    def insertLevelOrder(self, arr, i, n, parent):
        root = None
        if i < n:
            root = newNode(arr[i], parent)
            root.left = self.insertLevelOrder(arr, 2 * i + 1, n, i)
            root.right =self.insertLevelOrder(arr, 2 * i + 2, n, i)
            
        return root

    def append_participant(self, name):
        return  {
                        "id": secrets.token_hex(16),
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{name}",
                        "picture": None
                }

    def inOrder(self, root):
        if root != None:
            self.inOrder(root.left)

            if root.left == None:
                if len(self.participants) >= 2:
                    self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        self.append_participant(self.participants.pop()),
                        self.append_participant(self.participants.pop())
                    ]
                    })
                elif len(self.participants) == 1:
                    self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        self.append_participant(self.participants.pop()),
                    ]
                    })
                else:
                    self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": []
                    })             
            else:
                self.bracket.append({
                    "id": root.data,
                    "nextMatchId": root.parent,
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": []
                    })
            self.inOrder(root.right)

    def create_bracket(self):
        arr = range(self.single_el_number_of_matches())
        root = self.insertLevelOrder(arr, 0, len(arr), None)
        self.inOrder(root)
        a = sorted(self.bracket, key=lambda match: match.get('id'))
        a.append({'owner':'admin'})
        return a
    
    def add_result(self, result):
        print(result)


    
class RoundRobin:

    def __init__(self, participants):
        self.participants = [self.append_participant(name) for name in participants]
        self.match_table = [self.append_participant_to_table(name) for name in participants]

    @staticmethod
    def set_match_score(match, bracket):
        for round in bracket:
            for index, m in enumerate(round):
                if m['id'] == match['id']:
                    round[index] = match
                    print('work')
                    break
    
    def append_participant(self, name):
        return  {
                    "id": secrets.token_hex(16),
                    "resultText": 0,
                    "name": f"{name}",
                }
    
    def append_participant_to_table(self, name):
        return  {
                    "id": secrets.token_hex(16),
                    "name": f"{name}",
                    'set_win_losse': [0, 0],
                    'match_w_d_l': [0, 0, 0]
                }

    def create_round_robin_bracket(self):  
        round_robin_bracket = []
        if len(self.participants) % 2 == 1: self.participants = self.participants + [None]
        n = len(self.participants)
        map = list(range(n))
        mid = n // 2
        for i in range(n-1):
            l1 = map[:mid]
            l2 = map[mid:]
            l2.reverse()
            round = []
            for j in range(mid):
                t1 = self.participants[l1[j]]
                t2 = self.participants[l2[j]]
                if j == 0 and i % 2 == 1:
                    round.append({
                    "id": secrets.token_hex(16),
                    "startTime": "2023-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        t2,
                        t1
                    ]
                    })
                else:
                    round.append({
                    "id": secrets.token_hex(16),
                    "startTime": "2023-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        t1,
                        t2
                    ]
                    })
            round_robin_bracket.append(round)
            map = map[mid:-1] + map[:mid] + map[-1:]
            
        return round_robin_bracket
        # return {'rounds': round_robin_bracket, 'table': self.match_table}
    
    





