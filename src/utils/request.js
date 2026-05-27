import axios from 'axios'
import { useUserStore } from '../stores/user'
import router from '../router'
// 1. 创建 Axios 实例
const request = axios.create({
  // 这里写你 Go 后端的地址，注意修改端口号以匹配你的 Gin 启动端口
  baseURL: 'http://localhost:8080/api/v1/user',
  timeout: 5000 // 请求超时时间：5秒
})

// 2. 请求拦截器 (发往 Go 后端前执行)
request.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const token = userStore.token || localStorage.getItem('token')
    const validToken = String(token).trim()
    if (validToken && validToken !== 'undefined' && validToken !== 'null' && validToken !== '') {
      config.headers['Authorization'] = `Bearer ${validToken}`
    }else {
      console.warn('⚠️ 拦截器警告：当前请求未检测到有效 Token，Header 未注入 Authorization')
    }
    const traceId = localStorage.getItem('current_trace_id') || crypto.randomUUID()
    config.headers['X-Trace-Id'] = traceId
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 3. 响应拦截器 (拿到 Go 后端的数据后执行)
request.interceptors.response.use(
  response => {
    const res = response.data
    const headers = response.headers || {}
    const newToken = headers['new-token'] || headers['New-Token']
    if (newToken) {
      // 1. 替换掉 LocalStorage 里的快过期老 Token
      const userStore = useUserStore()
      userStore.setToken(newToken)
      localStorage.setItem('token', newToken)
      const newExpiredAt = headers['new-expired-at'] || headers['New-Expired-At']
      if (newExpiredAt) localStorage.setItem('expired_at', newExpiredAt)

      // 步骤 B：内存生效！立刻更新当前 Axios 实例的默认 Header
      // 【防翻车细节】：如果不写这行，用户接着点的下一个按钮，还是会带上旧的 Token 去请求
      request.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      console.log('🔄 恭喜！Token 已在后台静默续签完毕！')
    }
    if (res && Object.prototype.hasOwnProperty.call(res, 'code')) {
      if(res.code !== 200 && res.code !== 1){
        const errorMsg = res['error-message'] || res.msg || '服务器开小差了'
        alert(errorMsg)
        return Promise.reject(new Error(errorMsg))
      }
    }
    return res
  },
  error => {
    // 统一处理 HTTP 状态码错误
    let errorMsg = '服务器开小差了';
    if (error.response && error.response.data) {
      const res = error.response.data
      const rawMsg = res['error-message'] || res.msg || errorMsg
      errorMsg = typeof rawMsg === 'object' ? JSON.stringify(rawMsg) : rawMsg
    }
      const traceId = error.response ? error.response.headers['x-trace-id'] : ''
      let statusCode = error.response?.status
      switch (statusCode) {
        case 401: {
          // 401 未授权：说明 Token 没传、过期、或者造假
          alert(`$登录已过期，请重新登录\n[问题追踪ID: ${traceId || '无'}]`)
          const userStore = useUserStore()
          userStore.clearToken() // 清除失效 Token
          router.push('/') // 踢回登录页
          break
        }
        case 403: {
          // 403 被拒绝：说明 JWT 过了，但 Casbin 发现你没权限
          alert(`权限不足，禁止访问！\n[问题追踪ID: ${traceId || '无'}]`)
          break
        }
        default:{
          console.log(`${errorMsg}\n[问题追踪ID: ${traceId || '无'}]`)
        }
      }
    return Promise.reject(new Error(errorMsg))
  }
)

export default request
export const publicRequest = axios.create({
  baseURL: 'http://localhost:8080/api/v1/user',
  timeout: 5000
})

// 刷脸通道只需要全链路追踪 TraceID，压根不需要去碰任何关于 Token 的逻辑！
publicRequest.interceptors.request.use(config => {
  const traceId = localStorage.getItem('current_trace_id') || crypto.randomUUID()
  config.headers['X-Trace-Id'] = traceId
  return config
})

// 响应拦截也只需要最基础的报错提示即可
publicRequest.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)
