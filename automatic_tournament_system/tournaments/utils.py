import re
import math

def clear_participants(participants):
    return [i.strip() for i in re.split('\\r\\n', participants)]


def single_el_number_of_rounds(participants):
    return math.ceil(math.log2(len(participants)))

