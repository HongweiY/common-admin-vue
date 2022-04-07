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
    getDeptList(params) {
        return request({
            url: '/dept/list',
            method: 'get',
            data: params
        })
    },
    createUser(params) {
        return request({
            url: '/users/create',
            method: 'post',
            data: params
        })
    },
    // 菜单模块
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
    },
    // 角色模块
    getAllRolesList() {
        return request({
            url: '/roles/allList',
            method: 'get',
            data: {}
        })
    },
    getRolesList(params) {
        return request({
            url: '/roles/list',
            method: 'get',
            data: params
        })
    },
    operateRole(params) {
        return request({
            url: '/roles/operate',
            method: 'post',
            data: params
        })

    },
    deleteRoles(params) {
        return request({
            url: '/roles/del',
            method: 'post',
            data: params
        })
    },
    updatePermission(params) {
        return request({
            url: '/roles/permission/update',
            method: 'post',
            data: params
        })
    },
    //部门管理
    getAllUsers() {
        return request({
            url: '/users/allUsers',
            method: 'get',
            data: {}
        })
    },
    operateDept(params) {
        return request({
            url: 'dept/operate',
            method: 'post',
            data: params
        })
    },
    delDept(params) {
        return request({
            url: 'dept/delete',
            method: 'post',
            data: params
        })
    },
    getPermission() {
        return request({
            url: '/users/permission',
            method: 'get',
            data: {}
        })
    }

}
