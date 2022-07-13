# NOTE:
# Second file in folder
# Filename: P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt

import sys
import os
from datetime import datetime, timedelta
import random
import json

test = open("TESTING.txt", "w")
test.write(sys.argv[1])
test.close()

inputPath = sys.argv[1]
firstFileName = os.listdir(inputPath)[0]
f = open(os.path.join(inputPath, firstFileName), 'r')
# f = open("/Users/niveytha/Documents/My Documents/Coding/Learn-Angular-Electron/keysight-equipment-simulator/src/assets/scripts/i3070_Logs (Approach 1)/P1479299-00-D_SPGT19088000548-190509213620-MY58120179-Pass.txt", 'r')

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
