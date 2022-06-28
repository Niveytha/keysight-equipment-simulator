# NOTE:
# Second file in folder
# Filename: P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt

from datetime import datetime, timedelta
import random
import json

f = open("src/assets/scripts/i3070_Logs/P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt", 'r')

# for line in f:
#     line = line.split('|')

#     if line[0].lstrip('{') == '@BATCH':
#         uutType = line[1]
#         uutTypeRev = line[2]
#         fixtureID = line[3]
#         controller = line[9]

#     if line[0].lstrip('{') == '@BTEST':
#         boardID = line[1]
#         startTime = line[3]
#         duration = line[4]
#         endTime = line[10]

lines = f.readlines()

batchLine = lines[0].split('|')
btestLine = lines[1].split('|')

# !Extract initial values
uutType = batchLine[1]
uutTypeRev = batchLine[2]
fixtureID = batchLine[3]
controller = batchLine[9]

boardID = btestLine[1]
startTime = btestLine[3]
duration = btestLine[4]
endTime = btestLine[10]

# !send as JSON
results = {"uutType": uutType,
           "uutTypeRev": uutTypeRev,
           "fixtureID": fixtureID,
           "controller": controller,
           "boardID": boardID,
           "startTime": startTime,
           "duration": duration,
           "endTime": endTime}

resultsJSON = json.dumps(results)
print(resultsJSON)

f.close()
