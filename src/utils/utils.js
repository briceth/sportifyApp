import findIndex from 'lodash/findIndex'
//import uniqid from 'uniqid'

export function formatDuration(numMin) {
  const hours = Math.floor(numMin / 60)
  const minutes = numMin % 60
  return `${hours && `${hours}h`}${minutes}${hours ? '' : 'min'}`
}

export function deleteWhere(array, conditions = {}) {
  const index = findIndex(array, conditions)
  const newArray = [...array]
  newArray.splice(index, 1)
  return newArray
}

export function rangeDateByMonth(array) {
  const finalArray = []

  array.forEach(element => {
    const index = findIndex(finalArray, { month: element.month })

    if (index === -1) {
      finalArray.push(element)
    } else {
      finalArray[index].days.push(...element.days)
    }
  })
  console.log('final array', finalArray)

  return finalArray
}

export function mergeHoursAndIndex(array, index) {
  return array.map(element => {
    element.id = index
    return element
  })
}
