/**
 * 广告相关请求模块
 */

import request from '@/utils/request'

export const getQueryAdvert = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList',
    params
  })
}

export const changeAdvertStatus = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params
  })
}
