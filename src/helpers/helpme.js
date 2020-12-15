const checkCurrentForActuals = (current, actual) => {
  let someList = new Array(current.length)
  let finishedCols = []
  for (var i = 0; i < someList.length; i++) {
    someList[i] = [0, 0, 0, 0]
  }
  current.forEach((currentCol, currIndex) => {
    actual.forEach((actualCol, actIndex) => {
      let checkedNumbers = []
      currentCol.forEach(currentEl => {
        for (let k = 0; k < actualCol.length; k++) {
          let actualEl = actualCol[k]
          if (currentEl === actualEl) {
            if (
              checkedNumbers.length === 0 ||
              checkedNumbers.findIndex(x => x === k) < 0
            ) {
              checkedNumbers.push(k)
              someList[currIndex][actIndex] += 1
              if (someList[currIndex][actIndex] === currentCol.length) {
                finishedCols.push(currIndex)
              }
              break
            }
          }
        }
      })
    })
  })
  return { matrix: someList, finishedCols: finishedCols }
}

export const helpMeOnThisOne = (configuredLevel, current) => {
  let actual = configuredLevel.levelNumbers
  let currentInFormat = changeCurrentToCorrectFormat(
    current,
    configuredLevel.colNum,
    configuredLevel.rowNum
  )
  let situation = checkCurrentForActuals(currentInFormat, actual)
  return createMove(situation, currentInFormat, configuredLevel)
}

const changeCurrentToCorrectFormat = (current, colNum, rowNum) => {
  let currentInFormat = []
  for (let i = 0; i < rowNum; i++) {
    let col = []
    for (let j = 0; j < colNum; j++) {
      col.push(current[i + j * colNum])
    }
    currentInFormat.push(col)
  }
  return currentInFormat
}

const createMove = (situation, current, configuredLevel) => {
  let rowNum = configuredLevel.rowNum
  let colNum = configuredLevel.colNum
  let actual = configuredLevel.levelNumbers
  let currentCol
  let actualCol
  let found = false
  for (let k = 1; k < rowNum; k++) {
    for (let i = 0; i < colNum; i++) {
      if (situation.finishedCols.some(x => x === i)) {
        continue
      }
      let indexOfTarget = situation.matrix[i].findIndex(x => x === rowNum - k)
      if (indexOfTarget >= 0) {
        currentCol = i
        actualCol = indexOfTarget
        found = true
        break
      }
    }
    if (found) {
      break
    }
  }

  let foundItemAndReplacement = findFirstMissingItem(
    current[currentCol],
    actual[actualCol]
  )
  let exceptColumnList = situation.finishedCols
  exceptColumnList.push(currentCol)
  let targetIndex = findNumberIndex(
    current,
    exceptColumnList,
    foundItemAndReplacement.notFoundNumber
  )
  let result = {
    indexToBeRetrieved: targetIndex,
    indexToBeReplaced: [foundItemAndReplacement.indexToBeReplaced, currentCol]
  }
  console.log(result)
  return result
}

const findFirstMissingItem = (currentCol, actualCol) => {
  let notFoundNumber
  let checkedIndexes = []
  let foundNotFoundList = new Array(currentCol.length)
  for (let i = 0; i < actualCol.length; i++) {
    let found = false
    for (let j = 0; j < currentCol.length; j++) {
      if (currentCol[j] === actualCol[i]) {
        if (
          checkedIndexes.length === 0 ||
          checkedIndexes.findIndex(x => x === j) < 0
        ) {
          checkedIndexes.push(j)
          foundNotFoundList[j] = 'found'
          found = true
          break
        }
      }
    }
    if (!found) {
      notFoundNumber = actualCol[i]
    }
  }

  return {
    notFoundNumber: notFoundNumber,
    indexToBeReplaced: foundNotFoundList.findIndex(x => x !== 'found')
  }
}

const findNumberIndex = (current, exceptCol, searchNumber) => {
  let flatCurrent = current.flat(1)
  let foundIndex = -1
  let foundCol = -1
  let foundRow = -1
  while (foundIndex < 0) {
    foundIndex = flatCurrent.findIndex(x => x === searchNumber)
    foundCol = Math.floor(foundIndex / current.length)
    foundRow = foundIndex % current.length
    if (exceptCol.findIndex(x => x === foundCol) > -1) {
      flatCurrent[foundIndex] = -1
      foundIndex = -1
    }
  }
  return [foundRow, foundCol]
}
