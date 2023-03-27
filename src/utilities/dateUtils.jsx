function getMonthName(month) {
  switch (month) {
    case 0:
      return `January`
    case 1:
      return `February`
    case 2:
      return `March`
    case 3:
      return `April`
    case 4:
      return `May`
    case 5:
      return `June`
    case 6:
      return `July`
    case 7:
      return `August`
    case 8:
      return `September`
    case 9:
      return `October`
    case 10:
      return `November`
    case 11:
      return `December`
    default:
      return month
  }
}

export function dateFormatter(datetime, format = 'DD/MM/YYYY') {
  let formattedDatetime = new Date(datetime)
  return format
    .replace(/MMM/g, getMonthName(formattedDatetime.getMonth()))
    .replace(
      /DD/g,
      formattedDatetime.getDate() > 9
        ? formattedDatetime.getDate()
        : `0${formattedDatetime.getDate()}`,
    )
    .replace(
      /MM/g,
      formattedDatetime.getMonth() + 1 > 9
        ? formattedDatetime.getMonth() + 1
        : `0${formattedDatetime.getMonth() + 1}`,
    )
    .replace(/YYYY/g, formattedDatetime.getFullYear())
    .replace(
      /ss/g,
      formattedDatetime.getSeconds() > 9
        ? formattedDatetime.getSeconds()
        : `0${formattedDatetime.getSeconds()}`,
    )
    .replace(
      /mm/g,
      formattedDatetime.getMinutes() > 9
        ? formattedDatetime.getMinutes()
        : `0${formattedDatetime.getMinutes()}`,
    )
    .replace(
      /hh/g,
      formattedDatetime.getHours() > 9
        ? formattedDatetime.getHours()
        : `0${formattedDatetime.getHours()}`,
    )
}

export function dateDiff(date1, date2, absolute = true) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())

  const diffInDays = Math.floor((utc2 - utc1) / _MS_PER_DAY)

  return absolute ? Math.abs(diffInDays) : diffInDays
}

export function isToday(d) {
  let now = new Date()
  let date = new Date(d)

  if (
    `${now.getFullYear()}${now.getMonth()}${now.getDate()}` ===
    `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
  )
    return true
  return false
}

export function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}
