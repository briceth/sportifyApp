import findIndex from 'lodash/findIndex'
import { parse, format } from 'date-fns'
import fr from 'date-fns/locale/fr'

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

  return finalArray
}

export function mergeHoursAndIndex(array, index) {
  return array.map(element => {
    //element.id = index
    return element
  })
}

function generateId(str, hour = false) {
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

export function formatDate(sessions) {
  return sessions.map(session => {
    const date = session.startsAt
    const dayId = generateId(date)

    const dates = {
      month: format(parse(date), 'MMMM', { locale: fr }), //March, April
      days: [
        {
          letter: format(parse(date), 'ddd', { locale: fr }), //SUN, MON, TUE
          num: format(parse(date), 'DD'), //07, 08, 09
          id: dayId,
          hours: [
            {
              hour: format(parse(date), 'HH:MM'),
              id: generateId(date, true),
              _dayId: dayId,
              sessionId: session._id
            }
          ]
        }
      ]
    }

    return dates
  })
}
