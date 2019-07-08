export const debounce = function(fn, delay) {
  let timerId = null
  return function() {
    const context = this
    if (timerId) {
      window.clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn.apply(context, arguments)
      timerId = null
    }, delay)
  }
}
