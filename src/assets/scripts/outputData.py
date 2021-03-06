import sys
import json
from os import listdir, mkdir, remove
from os.path import isfile, join
from datetime import datetime, timedelta
from random import choice
import time

changedVars = {"uutType": sys.argv[1],
               "uutTypeRev": sys.argv[2],
               "fixtureID": sys.argv[3],
               "controller": sys.argv[4],
               "prefixValue": sys.argv[5] if sys.argv[5] != "undefined" else "",
               "findValue": sys.argv[6] if sys.argv[6] != "undefined" else "",
               "replaceValue": sys.argv[7] if sys.argv[7] != "undefined" else "",
               "startDateTime": sys.argv[8],
               "startDateTimeChanged": True if sys.argv[9] == "true" else False,
               "duration": int(sys.argv[10]),
               "durationChanged": True if sys.argv[11] == "true" else False,
               "endDateTime": sys.argv[12],
               "inputPath": sys.argv[13],
               "outputPath": sys.argv[14]
               }

if changedVars["duration"] >= 2:
    durationVariations = [-2, -1, 0, 1, 2]
elif changedVars["duration"] == 1:
    durationVariations = [-1, 0, 1, 2, 3]
elif changedVars["duration"] == 0:
    durationVariations = [0, 1, 2, 3, 4]

inputFolderPath = changedVars["inputPath"]

# !inputFolderPath = changedVars["inputPath"]
files = [f for f in listdir(inputFolderPath)
         if isfile(join(inputFolderPath, f))]  # ignore subdirectory

outputFolder = changedVars["outputPath"]

# !delete old output files if folder is not empty
# if len(listdir(outputFolder)) != 0:
for oldFile in listdir(outputFolder):
    remove(join(outputFolder, oldFile))

if changedVars["startDateTimeChanged"]:
    currentStartTime = datetime.now()
else:
    currentStartTime = datetime.strptime(
        changedVars["startDateTime"], "%y%m%d%H%M%S")

originalDuration = changedVars["duration"]

outputFilesCount = 0
for filename in files:
    try:
        f = open(join(inputFolderPath, filename), 'r')
        g = open(join(outputFolder, filename), 'w')

        lines = f.readlines()

        batchLine = lines[0].split('|')
        btestLine = lines[1].split('|')

        # !Modify & Replace with new values
        batchLine[1] = changedVars["uutType"]
        batchLine[2] = changedVars["uutTypeRev"]
        batchLine[3] = changedVars["fixtureID"]
        batchLine[9] = changedVars["controller"]

        # !1. Find & Replace BoardID
        if changedVars["findValue"] and changedVars["replaceValue"]:
            btestLine[1] = btestLine[1].replace(changedVars["findValue"],
                                                changedVars["replaceValue"])
        if changedVars["prefixValue"]:
            btestLine[1] = changedVars["prefixValue"] + btestLine[1]

        # !2. StartDateTime, EndDateTime & Duration
        if changedVars["durationChanged"]:
            durationVariation = choice(durationVariations)
            print(durationVariation)
            duration = timedelta(seconds=int(
                originalDuration)+durationVariation)
        else:
            duration = timedelta(seconds=int(changedVars["duration"]))
        changedVars["endDateTime"] = (
            currentStartTime + duration).strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
        changedVars["startDateTime"] = currentStartTime.strftime(
            "%y%m%d%H%M%S")  # !YYMMDDHHMMSS
        changedVars["duration"] = str(duration.seconds).zfill(6)
        currentStartTime = currentStartTime + duration
        print(duration)

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
        # print(outputFilesCount)
        f.close()
        g.close()
    except:
        print("An exception occurred (probably .DS_Store)!")
