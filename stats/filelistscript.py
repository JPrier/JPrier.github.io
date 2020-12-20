from os import listdir
from os.path import isfile, join

filename = "filenames.txt"
filenamefile = open(filename, 'w')

onlyfiles = [f for f in listdir('./') if isfile(join('./', f))]
ignoreList = ["filenames.txt", "filelistscript.py"]

for file in onlyfiles:
    if file not in ignoreList:
        filenamefile.write(file + "\n")

filenamefile.close()
