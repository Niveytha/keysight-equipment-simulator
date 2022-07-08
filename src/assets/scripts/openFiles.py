# TODO: FILE TO BE DELETED

# import os
from os import listdir, mkdir
from os.path import isfile, join

count = 0
folderPath = "/Users/niveytha/Documents/My Documents/Internships/Keysight (Summer Internship)/Intern-Project/Sample_Logs/i3070_Logs (Approach 1)"
files = [f for f in listdir(folderPath) if isfile(join(folderPath, f))]

for filename in files:
    with open(join(folderPath, filename), 'r') as f:
        count += 1
        # text = f.read()
        # print(text)
# print(count)

newDirName = "Output Files"
try:
    mkdir(join(folderPath, newDirName))
    print("Directory '", newDirName,  "' created")
except FileExistsError:
    print("Directory '", newDirName,  "' already exists")
