import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(34, () => {
    tableData.push(Mock.mock({
      username: '@cname()',
      title: '@cword(2,15)',
      thumb: '@img(100x100)',
      likes: '@integer(1,100)',
      comments: '@integer(1,100)',
      shares: '@integer(1,100)',
      status: '@integer(1,2)',
      isdel: '@integer(0,1)',
      addtime: '@date(yy-mm-dd)@time(hh-mm-ss)',
      description: '@cword(2,30)',
      href: '@url("http")',
      owner: '@integer(0,1)',
      classifyId: '@integer(1,3)',
      seriesId: '@integer(1,3)'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}
