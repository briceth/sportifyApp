import findIndex from 'lodash/findIndex'
//import uniqid from 'uniqid'

export function formatDuration(numMin) {
  const hours = Math.floor(numMin / 60)
  let minutes = numMin % 60
  console.log('minutes: ', minutes, ' - type: ', typeof minutes)
  if (minutes < 10) minutes = `0${minutes}`
  return `${hours === 0 ? '' : `${hours}h`}${minutes}${hours ? '' : 'min'}`
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

  return finalArray
}

export function mergeHoursAndIndex(array, index) {
  return array.map(element => {
    //element.id = index
    return element
  })
}

export function generateId(str, hour = false) {
  let id
  if (hour) {
    id = parseInt(
      str
        .substr(0, 16)
        .replace('T', '')
        .split(/-/)
        .join('')
        .replace(':', '')
    )
    // console.log('hour', id)

    return id
  } else {
    id = parseInt(
      str
        .substr(0, 10)
        .split('-')
        .join('')
    )
    return id
  }
}
