<template xmlns:el-row="http://www.w3.org/1999/html">
  <div class="user">
    <div class="query-form">
      <el-form ref="queryForm" :inline="true" :model="query">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="query.applyState" placeholder="请选择状态">
            <el-option :value="0" label="所有" />
            <el-option :value="1" label="待审批" />
            <el-option :value="2" label="审批中" />
            <el-option :value="3" label="审批拒绝" />
            <el-option :value="4" label="审批通过" />
            <el-option :value="5" label="作废" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handelQuery"> 查询</el-button>
          <el-button @click="handelRest('leaveForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button v-has="'leave-create'" type="primary" @click="showForm('create', {})">申请休假</el-button>
      </div>
      <el-table :data="leaveList">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.property"
          :label="item.label"
          :formatter="item.formatter"
          :property="item.property"
        />
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <el-button v-has="'user-edit'" @click="showForm('edit', scope.row)"> 查看</el-button>
            <el-button v-has="'user-delete'" type="danger" @click="userDel(scope.row)"> 作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :hide-on-single-page="pager.total > 1"
        :page-size="pager.pageSize"
        class="pagination"
        background
        :total="pager.total"
        layout="prev,pager,next"
        @current-change="handelPageChange"
      />
    </div>
    <!-- 申请修改 -->
    <el-dialog v-model="applyFormVisible" title="休假申请">
      <el-form ref="applyFormRef" :model="leaveForm" :label-width="formLabelWidth.value" :rules="rules">
        <el-form-item prop="applyTpe" label="休假类型">
          <el-select v-model="leaveForm.applyTpe" placeholder="请选择休假类型">
            <el-option label="事假" :value="1" />
            <el-option label="调休" :value="2" />
            <el-option label="年假" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="休假时间">
          <el-row>
            <el-col :spam="8">
              <el-form-item>
                <el-date-picker />
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :spam="8">
              <el-form-item>
                <el-date-picker />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="applyTpe" label="用户名">
          <el-input v-model="leaveForm.userName" placeholder="请输入用户名" :disabled="formMethod === 'edit'" />
        </el-form-item>
        <el-form-item prop="userEmail" label="邮箱">
          <el-input v-model="leaveForm.userEmail" placeholder="请输入邮箱" :disabled="formMethod === 'edit'">
            <template #append> @ymfsder.com</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model="leaveForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="job" label="岗位">
          <el-input v-model="leaveForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="leaveForm.state" placeholder="请选择用户状态">
            <el-option label="在职" :value="1" />
            <el-option label="离职" :value="2" />
            <el-option label="试用期" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item prop="roleList" label="系统角色">
          <el-select v-model="leaveForm.roleList" placeholder="请选择系统角色" multiple style="width: 100%">
            <el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="deptId" label="所属部门">
          <el-cascader
            v-model="leaveForm.deptId"
            placeholder="请选择用户所属部门"
            :options="deptList"
            style="width: 100%"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handelRest('applyFormRef')">取消</el-button>
          <el-button type="primary" @click="submitleaveForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRaw } from 'vue'
import utils from '../utils/utils'

const { proxy } = getCurrentInstance()
const query = reactive({
  applyState: 0,
})

const rules = reactive({
  userName: [
    {
      required: true,
      message: '请填写用户名',
      trigger: 'blur',
    },
  ],
})

const formLabelWidth = ref('80px')
// 表单是否显示
const applyFormVisible = ref(false)
const leaveForm = reactive({
  state: 3,
})
// 当前操作 create新增 edit编辑
const formMethod = ref('create')
const columns = reactive([
  {
    label: '单号',
    property: 'orderNo',
  },
  {
    label: '休假时间',
    property: '',
    formatter(row) {
      return `${utils.FormatDate(row.startTime, 'YYYY-MM-DD HH:mm:ss')}到${utils.FormatDate(
        row.endTime,
        'YYYY-MM-DD HH:mm:ss'
      )}`
    },
  },
  {
    label: '休假时长',
    property: 'leaveTime',
  },
  {
    label: '休假类型',
    property: 'applyType',
    formatter(row, column, val) {
      return {
        1: '事假',
        2: '调休',
        3: '年假',
      }[val]
    },
  },
  {
    label: '休假原因',
    property: 'reasons',
  },
  {
    label: '申请时间',
    property: 'createTime',
    formatter(row, column, val) {
      return utils.FormatDate(val, 'YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    label: '审批人',
    property: 'auditUsers',
  },
  {
    label: '当前审批人',
    property: 'curAuditUserName',
  },
  {
    label: '审批状态',
    property: 'applyState',
    formatter(row, column, val) {
      return {
        0: '所有',
        1: '待审批',
        2: '审批中',
        3: '审批拒绝',
        4: '审批通过',
        5: '作废',
      }[val]
    },
  },
])

const leaveList = ref([])
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
})
const roleList = ref([])
const deptList = ref([])
const getApplyList = async () => {
  const params = { ...query, ...pager }
  try {
    const { list, page } = await proxy.$api.getLeaveList(params)
    leaveList.value = list
    pager.total = page.total
  } catch (e) {
    proxy.$message.error('服务器异常')
    throw e
  }
}

onMounted(() => {
  getApplyList()
})

// 处理查询
const handelQuery = () => {
  getApplyList()
}
// 处理重置
const handelRest = form => {
  if (form === 'applyFormRef') {
    applyFormVisible.value = false
  }
  proxy.$refs[form].resetFields()
}
// 处理翻页
const handelPageChange = currentPage => {
  pager.pageNum = currentPage
  getApplyList()
}

// 控制表单显示
const showForm = (method, user) => {
  formMethod.value = method
  proxy.$nextTick(() => {
    if (method === 'edit') {
      Object.assign(leaveForm, user)
      CreateForm.userEmail = user.userEmail.split('@')[0]
    }
  })
  applyFormVisible.value = true
}
// 提交
const submitleaveForm = () => {
  proxy.$refs.applyFormRef.validate(async valid => {
    if (valid) {
      const params = toRaw(leaveForm)
      params.userEmail += '@ymfsder.com'
      params.action = formMethod.value
      const res = await proxy.$api.createUser(params)
      if (res) {
        userFormVisible.value = false
        handelRest('applyFormRef')
        proxy.$message.success('操作成功')
        await getUserList()
      }
    }
  })
}
</script>

<style scoped></style>
