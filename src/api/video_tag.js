import axios from '@/libs/api.request'

export const getVideoTagData = () => {
  return axios.request({
    url: '/api.videotag.getList',
    method: 'get'
  })
}

export const deleteTag = () => {
  return axios.request({
    url: '/api.videotag.deleteTag',
    method: 'post'
  })
}
