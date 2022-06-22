f = open("src/assets/scripts/i3070_Logs/test.txt", 'r')
for line in f:
    print(line)
f.close()

# !file works but delete menu function get variables from batch & btest form

# NOTE:
# Second file in folder
# Filename: P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt

# from datetime import datetime, timedelta
# import random

# def menu(uutType, uutTypeRev, fixtureID, controller, boardID, startTime, duration, endTime):
#     valid = ["1", "2", "3", "4", "5", "6", "7", "0"]
#     print("\nBelow are the current values from the file:")
    
#     print("\n@BATCH")
#     print("1. UUT Type: " + uutType)
#     print("2. UUT Type Rev: " + uutTypeRev)
#     print("3. Fixture ID: " + fixtureID)
#     print("4. Controller: " + controller)

#     print("\n@BTEST")
#     print("5. Board ID: " + boardID)
#     print("6. Start Datetime: " + startTime)
#     print("7. Duration: " + duration)
#     print("End Datetime: " + endTime)

#     print("\n0. Exit")

#     while True:
#         option = input("\nEnter a value you'd like to change [1, 2, 3, 4, 5, 6, 7, 0]: ")
#         if option in valid:
#             if option == "0":
#                 return uutType, uutTypeRev, fixtureID, controller, boardID, startTime, duration, endTime
            
#             if option == "1":
#                 uutType = input("Enter a new UUT Type = ")
#             elif option == "2":
#                 uutTypeRev = input("Enter a new UUT Type Rev = ")
#             elif option == "3":
#                 fixtureID = input("Enter a new Fixture ID = ")
#             elif option == "4":
#                 controller = input("Enter a new Controller = ")
#             elif option == "5":
#                 boardID = input("Enter a new Board ID = ")
#             elif option == "6":
#                 start = datetime.now()
#                 duration = int(duration)
#                 print("The current datetime of " + start.strftime("%m/%d/%Y, %H:%M:%S") + " will be used.")
#                 duration = timedelta(seconds=duration)
#                 endTime = (start + duration).strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
#                 startTime = start.strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
#                 duration = str(duration.seconds).zfill(6)
#                 print("The new End Datetime is: " + endTime)
#             elif option == "7":
#                 duration = int(input("Enter a new Duration = "))
#                 duration = timedelta(seconds=duration)
#                 start = datetime.strptime(startTime, "%y%m%d%H%M%S")
#                 endTime = (start + duration).strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
#                 startTime = start.strftime("%y%m%d%H%M%S")  # !YYMMDDHHMMSS
#                 print("The new End Datetime is: " + endTime)
#             print("Value successfully changed!")

#         else:
#             print("Invalid option selected.\n")

# try:
#     f = open("src/assets/scripts/i3070_Logs/P1479299-00-D_SPGT19088002596-190503103132-MY58120165-Pass.txt", 'r')
#     g = open("src/assets/scripts/i3070_Logs/output_file.txt", 'w') # !CHANGE FILE NAME ACCORDING TO CHANGES

#     print("hi")

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
    
#     print(uutType)
#     print("Old startTime: " + startTime)
#     uutType, uutTypeRev, fixtureID, controller, boardID, startTime, duration, endTime = menu(uutType, uutTypeRev, fixtureID, controller, boardID, startTime, duration, endTime)
#     print("New startTime: " + startTime)

#     # TODO: NOT PRINTING ANYTHING
#     for line in f:
#         print(line)

#     # TODO: output file is empty!
#     print("Output file has been created!")

# finally:
#     f.close()
#     g.close()