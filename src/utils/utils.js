import findIndex from 'lodash/findIndex'

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
