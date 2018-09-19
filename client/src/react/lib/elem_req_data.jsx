function req (url, query = '') {
  return new Promise((resolve, reject) => {
    let opt = {
      method: 'get',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      credentials: 'same-origin'
    }
    if (query) opt.body = query

    fetch(url, opt)
      .then(res => res.json())
      .then(res => {
        if (DEV) console.log(res)
        resolve(res)
      })
      .catch(err => {
        if (DEV) console.log(err)
        reject(err)
      })
  })
}

export default req
