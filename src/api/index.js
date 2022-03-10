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
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
            data: params,
            mock: true
        })
    },
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params,
            mock: true
        })
    },
    getRoleList() {
        return request({
            url: '/role/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getDeptList() {
        return request({
            url: '/dept/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    createUser(params) {
        return request({
            url: '/users/create',
            method: 'post',
            data: params,
            mock: true
        })
    }
}