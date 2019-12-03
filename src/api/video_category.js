import axios from '@/libs/api.request'

export const getVideoCategoryData = () => {
  return axios.request({
    url: 'get_video_category_data',
    method: 'get'
  })
}
