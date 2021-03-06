import Mock from 'mockjs'
import user from './data/user'

export const mocks = [...user]

export const mockXHR = () => {
  for (const i of mocks) {
    Mock.mock(new RegExp(`${import.meta.env.VITE_BASE_API_URI}${i.url}`), i.type || 'get', i.template)
  }
}
