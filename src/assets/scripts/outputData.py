# !CHANGE FILE NAME ACCORDING TO CHANGES
import sys
import json
from os import listdir, mkdir, remove
from os.path import isfile, join
from datetime import datetime, timedelta
from random import choice
import time

# f = open("src/assets/scripts/i3070_Logs/P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt", 'r')
# g = open("src/assets/scripts/i3070_Logs/output_file.txt", 'w')

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
# changedVars = {"uutType": "KEYS_1479299-00-D",
#                "uutTypeRev": "T2",
#                "fixtureID": "693",
#                "controller": "KEYS58120165",
#                "boardID": "KEYS_SPGT19088002596",
#                "startDateTime": "190503103136",
#                "startDateTimeChanged": "true",
#                "duration": "000002",
#                "durationChanged": "true",
#                "endDateTime": "190503103149"
#                }

durationVariations = [-2, -1, 0, 1, 2]

inputFolderPath = "src/assets/scripts/i3070_Logs (Approach 1)"
files = [f for f in listdir(inputFolderPath)
         if isfile(join(inputFolderPath, f))]  # ignore subdirectory

outputFolder = "Output Files"
try:
    mkdir(join(inputFolderPath, outputFolder))
    print("Directory '", outputFolder,  "' created")
except FileExistsError:
    print("Directory '", outputFolder,  "' already exists")

# !delete old output files
for oldFile in listdir(join(inputFolderPath, outputFolder)):
    remove(join(inputFolderPath, outputFolder, oldFile))

outputFilesCount = 0
for filename in files:
    f = open(join(inputFolderPath, filename), 'r')
    g = open(join(inputFolderPath, outputFolder, filename), 'w')

    lines = f.readlines()

    batchLine = lines[0].split('|')
    btestLine = lines[1].split('|')

    # !Process & modify variables
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
        durationVariation = choice(durationVariations)
        changedVars["duration"] = int(
            changedVars["duration"]) + durationVariation
        duration = timedelta(seconds=changedVars["duration"])
        start = datetime.strptime(
            changedVars["startDateTime"], "%y%m%d%H%M%S")
        changedVars["endDateTime"] = (
            start + duration).strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
        changedVars["startDateTime"] = start.strftime(
            "%y%m%d%H%M%S")  # !YYMMDDHHMMSS
        changedVars["duration"] = str(duration.seconds).zfill(6)

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

    print("Waiting for: " + changedVars["duration"])
    time.sleep(int(changedVars["duration"]))
    for line in lines:
        g.write(line)

    outputFilesCount += 1
    print(outputFilesCount)
    f.close()
    g.close()
