# !CHANGE FILE NAME ACCORDING TO CHANGES
import sys
import json

f = open("src/assets/scripts/i3070_Logs/P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt", 'r')
g = open("src/assets/scripts/i3070_Logs/output_file.txt", 'w')

# changedVars = sys.stdin.readlines()
# changedVarsJSON = json.loads(changedVars)  # dict with new changed variables

print(sys.argv[1])

changedVars = {"uutType": sys.argv[1],
               "uutTypeRev": sys.argv[2],
               "fixtureID": sys.argv[3],
               "controller": sys.argv[4],
               "boardID": sys.argv[5],
               "startTime": sys.argv[6],
               "duration": sys.argv[7],
               "endTime": sys.argv[8]
               }

print(changedVars)

# lines = f.readlines()

# batchLine = lines[0].split('|')
# btestLine = lines[1].split('|')

# # !Replace with new values
# batchLine[1] = changedVarsJSON["uutType"]
# batchLine[2] = changedVarsJSON["uutTypeRev"]
# batchLine[3] = changedVarsJSON["fixtureID"]
# batchLine[9] = changedVarsJSON["controller"]

# btestLine[1] = changedVarsJSON["boardID"]
# btestLine[3] = changedVarsJSON["startTime"]
# btestLine[4] = changedVarsJSON["duration"]
# btestLine[10] = changedVarsJSON["endTime"]

# # !Does not modify original file
# lines[0] = '|'.join(batchLine)
# lines[1] = '|'.join(btestLine)

# for line in lines:
#     g.write(line)

# f.close()
# g.close()
# sys.stdout.flush()
