# !file works but delete menu function get variables from batch & btest form

# NOTE:
# Second file in folder
# Filename: P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt

from datetime import datetime, timedelta
import random
       
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

print(uutType)

f.close()
g.close()

# try:
#     f = open("src/assets/scripts/i3070_Logs/P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt", 'r')
#     g = open("src/assets/scripts/i3070_Logs/output_file.txt", 'w') # !CHANGE FILE NAME ACCORDING TO CHANGES

#     for line in f:
#         line = line.split('|')
        
#         if line[0].lstrip('{') == '@BATCH':
#             uutType = line[1]
#             uutTypeRev = line[2]
#             fixtureID = line[3]
#             controller = line[9]
        
#         if line[0].lstrip('{') == '@BTEST':
#             boardID = line[1]
#             startTime = line[3]
#             duration = line[4]
#             endTime = line[10]
    
    # print("Old startTime: " + startTime)
    # uutType, uutTypeRev, fixtureID, controller, boardID, startTime, duration, endTime = menu(uutType, uutTypeRev, fixtureID, controller, boardID, startTime, duration, endTime)
    # print("New startTime: " + startTime)

    # TODO: NOT PRINTING ANYTHING
    # for line in f:
    #     print(line)

    # TODO: output file is empty!
    # print("Output file has been created!")

# finally:
#     f.close()
#     g.close()