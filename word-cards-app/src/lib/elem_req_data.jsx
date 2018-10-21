function req (url, method = 'get', query = '') {
  return new Promise((resolve, reject) => {
    let opt = {
      method: method,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      credentials: 'include'
    }
    if (query) opt.body = query

    fetch(`${process.env.REACT_APP_SERVER}${url}`, opt)
      .then(res => res.json())
      .then(res => {
        if (process.env.REACT_APP_DEV) console.log(res)
        resolve(res)
      })
      .catch(err => {
        if (process.env.REACT_APP_DEV) console.log(err)
        reject(err)
      })
  })
}

export default req
