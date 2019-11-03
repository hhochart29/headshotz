export default (_ctx, inject) => {
  inject('delay', (duration) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  })
}
