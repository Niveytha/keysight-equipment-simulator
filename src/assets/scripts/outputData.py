# !CHANGE FILE NAME ACCORDING TO CHANGES
import sys
import json
from datetime import datetime, timedelta
# import random

f = open("src/assets/scripts/i3070_Logs/P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt", 'r')
g = open("src/assets/scripts/i3070_Logs/output_file.txt", 'w')

changedVars = {"uutType": sys.argv[1],
               "uutTypeRev": sys.argv[2],
               "fixtureID": sys.argv[3],
               "controller": sys.argv[4],
               "boardID": sys.argv[5],
               "startDateTime": sys.argv[6],
               "startDateTimeChanged": sys.argv[7],
               "duration": sys.argv[8],
               "durationChanged": sys.argv[9],
               "endDateTime": sys.argv[10]
               }

# !testing - to be deleted
# changedVars = {"uutType": "1479299-00-D",
#                "uutTypeRev": "T1",
#                "fixtureID": "593",
#                "controller": "MY58120165",
#                "boardID": "P1479299-00-D_SPGT19088002596",
#                "startDateTime": "190503103136",
#                "startDateTimeChanged": True,
#                "duration": "000013",
#                "durationChanged": False,
#                "endDateTime": "190503103149"
#                }

lines = f.readlines()

batchLine = lines[0].split('|')
btestLine = lines[1].split('|')

# !Process & modify variables - WORKS
# 1. StartDateTime & EndDateTime
if changedVars["startDateTimeChanged"] == "true":
    start = datetime.now()
    duration = timedelta(seconds=int(changedVars["duration"]))
    changedVars["endDateTime"] = (
        start + duration).strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
    changedVars["startDateTime"] = start.strftime(
        "%y%m%d%H%M%S")  # !YYMMDDHHMMSS
    changedVars["duration"] = str(duration.seconds).zfill(6)

# 2. Duration
if changedVars["durationChanged"] == "true":
    duration = timedelta(seconds=int(changedVars["duration"]))
    start = datetime.strptime(changedVars["startDateTime"], "%y%m%d%H%M%S")
    changedVars["endDateTime"] = (
        start + duration).strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
    changedVars["startDateTime"] = start.strftime(
        "%y%m%d%H%M%S")  # !YYMMDDHHMMSS
    changedVars["duration"] = str(duration.seconds).zfill(6)


# print("Old StartTime: " + changedVars["startDateTime"])
# print("New StartTime: " + startTime + "\n")

# print("Old Duration: " + changedVars["duration"])
# print("New Duration: " + str(duration) + "\n")

# print("Old EndTime: " + changedVars["endDateTime"])
# print("New EndTime: " + endTime + "\n")

# 2.

# !Replace with new values
batchLine[1] = changedVars["uutType"]
batchLine[2] = changedVars["uutTypeRev"]
batchLine[3] = changedVars["fixtureID"]
batchLine[9] = changedVars["controller"]

btestLine[1] = changedVars["boardID"]
btestLine[3] = changedVars["startDateTime"]
btestLine[4] = changedVars["duration"]
btestLine[10] = changedVars["endDateTime"]

# !Does not modify original file
lines[0] = '|'.join(batchLine)
lines[1] = '|'.join(btestLine)

for line in lines:
    g.write(line)

f.close()
g.close()
