(() => {
  if (DEV) {
    const body = document.body
    let elem = document.createElement('div')
    elem.innerHTML = 'Client is built in development mode'
    elem.style.cssText = 'background: wheat; font-style: italic;'
    body.insertBefore(elem, body.firstElementChild)
  }
})()
