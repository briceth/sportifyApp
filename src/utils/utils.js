import findIndex from 'lodash/findIndex'
import { parse, format, distanceInWords } from 'date-fns'
import fr from 'date-fns/locale/fr'

export function formatDuration(numMin) {
  const hours = Math.floor(numMin / 60)
  let minutes = numMin % 60
  if (minutes < 10) minutes = `0${minutes}`
  return `${hours === 0 ? '' : `${hours}h`}${minutes}${hours ? '' : 'min'}`
}

export function deleteWhere(array, conditions = {}) {
  const index = findIndex(array, conditions)
  const newArray = [...array]
  newArray.splice(index, 1)
  return newArray
}

function rangeHoursByDays(days) {
  const finalArray = []

  days.forEach(day => {
    const index = findIndex(finalArray, { num: day.num })

    if (index === -1) {
      finalArray.push(day)
    } else {
      finalArray[index].hours.push(...day.hours)
    }
  })
  return finalArray
}

export function rangeDateByMonth(array) {
  const finalArray = []

  array.forEach(month => {
    const index = findIndex(finalArray, { month: month.month })

    if (index === -1) {
      finalArray.push(month) //si le mois n'est pas présent tu l'ajoutes
    } else {
      finalArray[index].days.push(...month.days) // sinon ajoute les jours au mois déjà présent
    }
  })

  // je me demande si c'est pas un peu moche... mais ça fonctionne
  return finalArray.map(month => {
    const rangedHours = rangeHoursByDays(month.days)
    month.days = []
    month.days.push(...rangedHours)
    return month
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
  const finalArray = []
  sessions.forEach(session => {
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
              session: session
            }
          ]
        }
      ]
    }
    finalArray.push(dates)
  })
  return finalArray
}

export function startsAt(dateToCompare) {
  return distanceInWords(dateToCompare, new Date(), {
    locale: fr
  })
}
