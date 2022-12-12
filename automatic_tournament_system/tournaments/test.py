import math
import json

def single_el_number_of_rounds(participants):
    return math.ceil(math.log2(len(participants)))


def single_el_number_of_matches(participants):
    return 2 ** single_el_number_of_rounds(participants) - 1


class newNode:
	def __init__(self, data, parent):
		self.data = data
		self.parent = parent
		self.left = self.right = None
       
class Tree:
    def __init__(self, participants):
        self.participants = participants
        self.root = None
        self.bracket = []

    def single_el_number_of_rounds(self):
        return math.ceil(math.log2(len(self.participants)))


    def single_el_number_of_matches(self):
        return 2 ** single_el_number_of_rounds(self.participants) - 1
    
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
                        "picture": "null"
                        },
                        {
                        "id": "d1",
                        "resultText": 0,
                        "isWinner": False,
                        "status": None,
                        "name": f"{self.participants.pop()}",
                        "picture": "null"
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
                        "picture": "null"
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
        arr = range(single_el_number_of_matches(self.participants))
        root = self.insertLevelOrder(arr, 0, len(arr), None)
        self.inOrder(root)
        return json.dumps(self.bracket)




a = Tree(['as', 'ad', 'af', 'ada', 'da'])
a.create_bracket()


    


    
    





