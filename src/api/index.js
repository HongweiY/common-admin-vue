/**
 * api管理
 */

import request from '../utils/request'

export default {
    login(params) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params
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
    getMenuList(params) {
        return request({
            url: '/menus/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
            data: params
        })
    },
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params
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
            data: params
        })
    },
    createMenu(params) {
        return request({
            url: '/menus/create',
            method: 'post',
            data: params
        })
    },
    delMenu(menuId) {
        return request({
            url: '/menus/del',
            method: 'post',
            data: menuId
        })
    }
}
