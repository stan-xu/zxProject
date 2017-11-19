// api接口地址
var root = '/blade'

// 引用axios
var axios = require('axios')

// 判断元素类型
let toType = (obj) => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤
let filterNull = (o) => {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// axios封装
let apiAxios = (method, url, params, success, fail) => {
  if (params) {
    params = filterNull(params)
  }

  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  }).then(
    res => {
      if (!res.code) { // 分页接口不存在code
        success(res.data)
      } else if (res.code === 401) { // 后端约定未登录code=401
        alert(res.message)
      } else if (res.data.success === true) {
        if (success) { success(res.data) }
      } else {
        if (fail) { fail(res.data) } else { alert(`error:${res.message}`) }
      }
    }
  ).catch(err => {
    let res = err.response
    if (err) { alert(`HTTP CODE:${res.status}`) }
  })
}

// 可调用接口
export default {
  get: (url, params, success, fail) => {
    return apiAxios('GET', url, params, success, fail)
  },
  post: (url, params, success, fail) => {
    return apiAxios('POST', url, params, success, fail)
  },
  put: (url, params, success, fail) => {
    return apiAxios('PUT', url, params, success, fail)
  },
  delete: (url, params, success, fail) => {
    return apiAxios('DELETE', url, params, success, fail)
  }
}
