import math
from random import *
import json
levelRows=[5,6,6,6,6,6,6,7,7,7,8,8,8,8,8,8]
levelCols=[5,5,5,6,6,7,7,7,7,7,7,7,8,8,8,8]
levelMin=[100,110,110,120,120,130,130,140,140,150,150,150,150,160,160,160]
levelMax=[120,130,130,140,140,150,150,160,160,170,170,170,170,180,180,180]

startLevel=111

subArray = []
mainArray = []
levelObj = {}
levelListObj = []

def generate_values(target, numCount):
    values = []
    print("target = " + str(target))
    print("numCount=" + str(numCount))
    for i in range(numCount):
        print(str(i) + "nci sayi")

        if i == (numCount - 1):
            values.append(target)
            print("value=" + str(target))
        else:
            value = randint(1, target-numCount+i)
            print("value=" + str(value))
            values.append(value)
            target -= value
        print("\n")
        
    return values

for i in range(len(levelCols)):
    print("i=" + str(i))
    for j in range(10):
        print("j=" + str(j))
        targetNum = randint(levelMin[i], levelMax[i])
        for k in range(levelCols[i]):
            print("kolon=" + str(k))
            mainArray.append(generate_values(targetNum, levelRows[i]))
        levelObj = {
            "level": startLevel + (10*i + j),
            "rowNum": levelRows[i],
            "colNum": levelCols[i],
            "levelNumbers": mainArray
        }
        levelListObj.append(levelObj)
        levelObj = {}
        mainArray = []

f = open("levels_new.js", "w")
f.write(json.dumps(levelListObj))
f.close()