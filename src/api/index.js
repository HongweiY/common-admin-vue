/**
 * api管理
 */

import request from "../utils/request";

export default {
    login(params) {
        return request({
            url: "/users/login",
            method: 'post',
            data: params,
            mock: false
        })

    },
    getNoticeCount() {
        return request({
            url: '/notice/count',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getMenuList() {
        return request({
            url: '/menu/list',
            method: 'get',
            data: {},
            mock: true
        })
    }
}