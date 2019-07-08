const oneDayMS = 86400000

export const dateFormat = (date, divide='-') => {
  if (typeof date === 'string') {
    return date
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let arr = [month, day]
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] < 10 ? '0' + arr[i] : arr[i]
  }
  return `${year}${divide}${arr[0]}${divide}${arr[1]}`
}

export const initFromDate = (date, days) => {
  let dateObj = new Date(date - oneDayMS * days)
  return dateFormat(dateObj)
}

export const initToDate = (date) => {
  return dateFormat(date)
}
