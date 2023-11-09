import Axios from 'axios'
import { REQUEST_BASE_URL_DEV, REQUEST_BASE_URL_PROD } from '@/commons/const'

const instanceNormal = () => {
  // console.log(token)
  let token = ''
  let headers = token !== '' ? {
    'Authorization': 'bear ' + token
  } : {}
  return Axios.create({
    baseURL:
      process.env.NODE_ENV === 'production'
        ? REQUEST_BASE_URL_PROD
        : REQUEST_BASE_URL_DEV,
    headers
  })
}

// const _postFile = (url, data) => {
//   let header = {
//     'Content-Type': 'multipart/form-data'
//   }
// }

const _get = (url, config) => {
  return new Promise((resolve, reject) => {
    instanceNormal()
      .get(url, config)
      .then(data => {
        resolve(data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const _post = (url, data, config) => {
  return new Promise((resolve, reject) => {
    instanceNormal()
      .post(url, data, config)
      .then(_data => {
        resolve(_data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
const _delete = (url, config) => {
  return new Promise((resolve, reject) => {
    instanceNormal()
      .delete(url, config)
      .then(data => {
        resolve(data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const _put = (url, config) => {
  return new Promise((resolve, reject) => {
    instanceNormal()
      .put(url, config)
      .then(data => {
        resolve(data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const __post = (url, data) => {
  return new Promise((resolve, reject) => {
    instanceNormal()
      .post(url, data)
      .then(_data => {
        resolve(_data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// export function exportEx (url, _data) {
//   Axios({
//     method: 'post',
//     url: `${url}`,
//     data: _data.data,
//     responseType: 'blob'
//   }).then(res => {
//     const link = document.createElement('a')
//     let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
//     link.style.display = 'none'
//     link.href = URL.createObjectURL(blob)
//     link.download = _data.fileName // 下载的文件名
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   })
// }

export default {
  _get,
  _post,
  _delete,
  _put,
  __post
}
