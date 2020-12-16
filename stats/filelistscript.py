from os import listdir
from os.path import isfile, join

filename = "filenames.txt"
filenamefile = open(filename, 'w')

onlyfiles = [f for f in listdir('./') if isfile(join('./', f))]

for file in onlyfiles:
    filenamefile.write(file + "\n")

filenamefile.close()
