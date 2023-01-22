import re
import math
import secrets


def clear_participants(participants):
    return [i.strip() for i in re.split('\\n', participants)]


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
        # Base case for recursion
        if i < n:
            root = newNode(arr[i], parent)

            # insert left child
            root.left = self.insertLevelOrder(arr, 2 * i + 1, n, i)

            # insert right child
            root.right =self.insertLevelOrder(arr, 2 * i + 2, n, i)
            
        return root


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
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{self.participants.pop()}",
                        "picture": None
                        },
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{self.participants.pop()}",
                        "picture": None
                        },
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
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{self.participants.pop()}",
                        "picture": None
                        }
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
        self.participants = participants
        self.bracket = []

    @staticmethod
    def replace(id, match, bracket):
        for round in bracket:
            for index, m in enumerate(round):
                if m['id'] == match['id']:
                    round[index] = match
                    print('work')
                    break

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
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        {
                        "id": secrets.token_hex(16),
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t2}",
                        "picture": None
                        },
                        {
                        "id": secrets.token_hex(16),
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t1}",
                        "picture": None
                        },
                    ]
                    })
                else:
                    round.append({
                    "id": secrets.token_hex(16),
                    "tournamentRoundText": "test",
                    "startTime": "2021-05-30",
                    "state": "SCHEDULED",
                    "participants": [
                        {
                        "id": secrets.token_hex(16),
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t1}",
                        "picture": None
                        },
                        {
                        "id": secrets.token_hex(16),
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{t2}",
                        "picture": None
                        },
                    ]
                    })
            round_robin_bracket.append(round)
            map = map[mid:-1] + map[:mid] + map[-1:]
        return round_robin_bracket
    
    





