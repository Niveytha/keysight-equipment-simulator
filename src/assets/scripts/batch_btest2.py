# !file works but delete menu function get variables from batch & btest form

# NOTE:
# Second file in folder
# Filename: P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt

from datetime import datetime, timedelta
import random
import json
       
f = open("src/assets/scripts/i3070_Logs/P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt", 'r')
g = open("src/assets/scripts/i3070_Logs/output_file.txt", 'w') # !CHANGE FILE NAME ACCORDING TO CHANGES

for line in f:
    line = line.split('|')
        
    if line[0].lstrip('{') == '@BATCH':
        uutType = line[1]
        uutTypeRev = line[2]
        fixtureID = line[3]
        controller = line[9]
        
    if line[0].lstrip('{') == '@BTEST':
        boardID = line[1]
        startTime = line[3]
        duration = line[4]
        endTime = line[10]

# !send as JSON
results = {"uutType":uutType, 
            "uutTypeRev": uutTypeRev,
            "fixtureID": fixtureID,
            "controller": controller, 
            "boardID": boardID, 
            "startTime": startTime, 
            "duration": duration, 
            "endTime": endTime,}

resultsJSON = json.dumps(results)
print(resultsJSON)

f.close()
g.close()