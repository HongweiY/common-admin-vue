<template>
  <div class="user">
    <div class="query-form">
      <el-form
        ref="userForm"
        :inline="true"
        :model="user"
      >
        <el-form-item
          prop="userName"
          label="用户名"
        >
          <el-input
            v-model="user.userName"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          prop="userEmail"
          label="用户邮箱"
        >
          <el-input
            v-model="user.userEmail"
            placeholder="请输入用户邮箱"
          />
        </el-form-item>
        <el-form-item
          label="用户状态"
          prop="state"
        >
          <el-select
            v-model="user.state"
            placeholder="请选择用户状态"
          >
            <el-option
              :value="0"
              label="所有"
            />
            <el-option
              :value="1"
              label="在职"
            />
            <el-option
              :value="2"
              label="离职"
            />
            <el-option
              :value="3"
              label="试用期"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handelQuery"
          >
            查询
          </el-button>
          <el-button @click="handelRest('userForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button
          v-has="'user-create'"
          type="primary"
          @click="showForm('create',{})"
        >
          新增
        </el-button>
        <el-button
          v-has="'user-batch-delete'"
          type="danger"
          @click="batchDelete"
        >
          批量删除
        </el-button>
      </div>
      <el-table
        :data="userList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="item in columns"
          :key="item.property"
          :label="item.label"
          :formatter="item.formatter"
          :property="item.property"
        />
        <el-table-column
          label="操作"
          width="240"
        >
          <template #default="scope">
            <el-button
              v-has="'user-edit'"
              @click="showForm('edit',scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-has="'user-delete'"
              type="danger"
              @click="userDel(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :hide-on-single-page="pager.total>1"
        :page-size="pager.pageSize"
        class="pagination"
        background
        :total="pager.total"
        layout="prev,pager,next"
        @current-change="handelPageChange"
      />
    </div>
    <!-- 添加用户-->
    <el-dialog
      v-model="userFormVisible"
      :title="formMethod==='edit'?'编辑用户':'新增用户'"
    >
      <el-form
        ref="userCreateFormRef"
        :model="userCreateForm"
        :label-width="formLabelWidth"
        :rules="rules"
      >
        <el-form-item
          prop="userName"
          label="用户名"
        >
          <el-input
            v-model="userCreateForm.userName"
            placeholder="请输入用户名"
            :disabled="formMethod==='edit'"
          />
        </el-form-item>
        <el-form-item
          prop="userEmail"
          label="邮箱"
        >
          <el-input
            v-model="userCreateForm.userEmail"
            placeholder="请输入邮箱"
            :disabled="formMethod==='edit'"
          >
            <template #append>
              @ymfsder.com
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="mobile"
          label="手机号"
        >
          <el-input
            v-model="userCreateForm.mobile"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item
          prop="job"
          label="岗位"
        >
          <el-input
            v-model="userCreateForm.job"
            placeholder="请输入岗位"
          />
        </el-form-item>
        <el-form-item
          prop="state"
          label="状态"
        >
          <el-select
            v-model="userCreateForm.state"
            placeholder="请选择用户状态"
          >
            <el-option
              label="在职"
              :value="1"
            />
            <el-option
              label="离职"
              :value="2"
            />
            <el-option
              label="试用期"
              :value="3"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="roleList"
          label="系统角色"
        >
          <el-select
            v-model="userCreateForm.roleList"
            placeholder="请选择系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="deptId"
          label="所属部门"
        >
          <el-cascader
            v-model="userCreateForm.deptId"
            placeholder="请选择用户所属部门"
            :options="deptList"
            style="width: 100%"
            :props="{checkStrictly:true,value:'_id',label:'deptName'}"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handelRest('userCreateFormRef')">取消</el-button>
          <el-button
            type="primary"
            @click="submitUserCreateForm"
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>

import { getCurrentInstance, onMounted, reactive, ref, toRaw } from 'vue'
import utils from '../utils/utils'

const { proxy } = getCurrentInstance()
const user = reactive({
  state: 1
})
// 新增用户验证
const rules = reactive({
  userName: [
    {
      required: true,
      message: '请填写用户名',
      trigger: 'blur'
    }
  ],
  userEmail: [
    {
      required: true,
      message: '请填写邮箱',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      pattern: /1[3-9]\d{9}/,
      message: '请填写正确格式手机号',
      trigger: 'blur'
    }
  ],
  deptId: [
    {
      required: true,
      message: '请填写用户名',
      trigger: 'blur'
    }
  ]
})
const formLabelWidth = ref('80px')
// 表单是否显示
const userFormVisible = ref(false)
const userCreateForm = reactive({
  state: 3
})
// 当前操作 create新增 edit编辑
const formMethod = ref('create')
const selectUserIds = ref([])
const columns = reactive([
  {
    label: '用户ID',
    property: 'userId'
  },
  {
    label: '用户名',
    property: 'userName'
  },
  {
    label: '用户邮箱',
    property: 'userEmail'
  },
  {
    label: '用户角色',
    property: 'role',
    formatter(row, column, val) {
      return {
        0: '管理员',
        1: '普通用户'
      }[val]
    }
  },
  {
    label: '用户状态',

    property: 'state',
    formatter(row, column, val) {
      return {
        1: '在职',
        2: '离职',
        3: '试用期'
      }[val]
    }
  },
  {
    label: '注册时间',
    property: 'createTime',
    formatter(row, column, val) {
      return utils.FormatDate(val, 'YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    label: '最后登陆时间',
    property: 'lastLoginTime',
    formatter(row, column, val) {
      return utils.FormatDate(val, 'YYYY-MM-DD HH:mm:ss')
    }
  }
])

const userList = ref([])
const pager = reactive({
  pageNum: 1,
  pageSize: 10
})
const roleList = ref([])
const deptList = ref([])
onMounted(() => {
  getUserList()
})

// 获取用户列表
const getUserList = async () => {
  const params = { ...user, ...pager }
  try {
    const { list, page } = await proxy.$api.getUserList(params)
    userList.value = list
    pager.total = page.total
  } catch (e) {
    proxy.$message.error('服务器异常')
    throw e
  }
}
// 处理查询
const handelQuery = () => {
  getUserList()
}
// 处理重置
const handelRest = (form) => {
  if (form === 'userCreateFormRef') {
    userFormVisible.value = false
  }
  proxy.$refs[form].resetFields()
}
// 处理翻页
const handelPageChange = (currentPage) => {
  pager.pageNum = currentPage
  getUserList()
}
// 删除单个用户
const userDel = async (row) => {
  await proxy.$api.userDel({ ids: [row._id] })
  proxy.$message.success('删除成功')
  await getUserList()
}
// 批量删除用户
const batchDelete = async () => {
  if (selectUserIds.value.length === 0) {
    proxy.$message.error('请选择要删除的用户')
    return
  }
  const nModified = await proxy.$api.userDel({ ids: selectUserIds.value })
  if (nModified > 0) {
    selectUserIds.value = []
    proxy.$message.success('删除成功')
    await getUserList()
  }
}
// 处理多选
const handleSelectionChange = (list) => {
  list.forEach((item) => {
    selectUserIds.value.push(item._id)
  })
}
// 控制表单显示
const showForm = (method, user) => {
  formMethod.value = method
  proxy.$nextTick(() => {
    if (method === 'edit') {
      Object.assign(userCreateForm, user)
      userCreateForm.userEmail = user.userEmail.split('@')[0]
    }
  })
  userFormVisible.value = true
  getRoleList()
  getDeptList()
}
// 提交
const submitUserCreateForm = () => {
  proxy.$refs.userCreateFormRef.validate(async (valid) => {
    if (valid) {
      const params = toRaw(userCreateForm)
      params.userEmail += '@ymfsder.com'
      params.action = formMethod.value
      const res = await proxy.$api.createUser(params)
      if (res) {
        userFormVisible.value = false
        handelRest('userCreateFormRef')
        proxy.$message.success('操作成功')
        await getUserList()
      }
    }
  })
}
// 获取部门列表
const getDeptList = async () => {
  const list = await proxy.$api.getDeptList()
  deptList.value = list
}

// 获取角色列表
const getRoleList = async () => {
  const list = await proxy.$api.getAllRolesList()
  roleList.value = list
}

</script>

<style scoped>

</style>
