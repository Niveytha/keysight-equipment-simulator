import sys
import os
from datetime import datetime, timedelta
import random
import json

inputPath = sys.argv[1]
firstFileName = os.listdir(inputPath)[0]
f = open(os.path.join(inputPath, firstFileName), 'r')

lines = f.readlines()

batchLine = lines[0].split('|')
btestLine = lines[1].split('|')

# !Extract initial values
uutType = batchLine[1]
uutTypeRev = batchLine[2]
fixtureID = batchLine[3]
controller = batchLine[9]

boardID = btestLine[1]
startDateTime = btestLine[3]
duration = btestLine[4]
endDateTime = btestLine[10]

# !send as JSON
results = {"uutType": uutType,
           "uutTypeRev": uutTypeRev,
           "fixtureID": fixtureID,
           "controller": controller,
           "boardID": boardID,
           "startDateTime": startDateTime,
           "duration": duration,
           "endDateTime": endDateTime}

resultsJSON = json.dumps(results)
print(resultsJSON)

f.close()
