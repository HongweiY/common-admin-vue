<template>
  <div class="role">
    <div class="query-form">
      <el-form
        ref="queryFormRef"
        :model="queryForm"
        :inline="true"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="queryForm.roleName"
            placeholder="请输入角色名称"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="handelQuery()"
          >
            查找
          </el-button>
          <el-button @click="resetForm('queryFormRef')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button
          type="primary"
          @click="showDialog('create',{})"
        >
          新增
        </el-button>
      </div>
      <el-table
        :data="roleList"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :formatter="item.formatter"
        />
        <el-table-column
          label="操作"
          :width="300"
        >
          <template #default="scope">
            <el-button @click="showDialog('edit',scope.row)">
              编辑
            </el-button>
            <el-button
              type="primary"
              @click="showPermissionDialog(scope.row)"
            >
              设置权限
            </el-button>
            <el-button
              type="danger"
              @click="handelDel(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handelPageChange"
      />
    </div>
    <!--    添加权限   -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
    >
      <el-form
        ref="rolesFormRef"
        :rules="rules"
        :model="rolesForm"
        label-width="120px"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="rolesForm.roleName"
            placeholder=""
          />
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input
            v-model="rolesForm.remark"
            type="textarea"
            placeholder=""
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm('rolesFormRef')">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm()"
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--    设置权限-->
    <el-dialog v-model="permissionVisitable">
      <el-form>
        <el-form-item label="角色名称">
          {{ editRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="permissionTree"
            default-expand-all
            show-checkbox
            :data="menuList"
            node-key="_id"
            :props="{label:'menuName'}"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionVisitable=false">取消</el-button>
          <el-button
            type="primary"
            @click="handelPermission()"
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
import utils from '../utils/utils'

const { proxy } = getCurrentInstance()
const permissionVisitable = ref(false)
const editRoleName = ref('')
const menuList = ref({})
const dialogVisible = ref(false)
const roleId = ref('')
const actionsMap = ref({})
//dialog标题
const dialogTitle = ref('添加角色')
//查询表单
const queryForm = reactive({})
//分页
const pager = reactive({
  pageSize: 10,
  pageNum: 1
})
const rules = reactive({
  roleName: {
    required: true,
    message: '权限名称必须',
    trigger: 'blur'
  }
})
// 表格
const columns = reactive([
  {
    label: '角色名称',
    prop: 'roleName'
  },
  {
    label: '备注',
    prop: 'remark'
  },
  {
    label: '权限列表',
    prop: 'permissionList',
    formatter(row, column, val) {
      const list = []
      const halfCheckKeys = val.halfCheckKeys
      halfCheckKeys.forEach(key => {
        if (actionsMap.value[key]) list.push(actionsMap.value[key])
      })
      return list.join(',')
    }
  },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter(row, column, val) {
      return utils.FormatDate(val, 'YYYY-MM-DD HH:mm:ss')
    }
  }
])
//角色列表
const roleList = ref([])
// 当前操作类型
const action = ref()
// 角色添加/编辑表单
const rolesForm = reactive({})
onMounted(() => {
  getRolesList()
  getMenuList()
})

// 获取角色列表
const getRolesList = async () => {
  const params = { ...queryForm, ...pager }
  const { list, page } = await proxy.$api.getRolesList(params)
  pager.total = page.total
  roleList.value = list
}
//获取菜单
const getMenuList = async () => {
  const list = await proxy.$api.getMenuList()
  menuList.value = list
  actionMap(list)
}
// 删除
const handelDel = async (id) => {
  await proxy.$api.deleteRoles({ _id: id })
  proxy.$message.success('删除成功')
  await getRolesList()

}

//展示编辑/添加列表
const showDialog = (operate, row) => {
  dialogVisible.value = true
  proxy.$nextTick(() => {
    Object.assign(rolesForm, row)
    action.value = operate
    if (operate === 'edit') {
      dialogTitle.value = '编辑角色'
    }
  })
}

// 查询
const handelQuery = () => {
  getRolesList()
}

//重置表单
const resetForm = (form) => {
  proxy.$refs[form].resetFields()
  if (form === 'rolesFormRef') {
    dialogVisible.value = false
  }
  proxy.$refs[form].resetFields()
}
// 提交表单
const submitForm = async () => {
  const params = { ...rolesForm }
  params.action = action.value
  const res = await proxy.$api.operateRole(params)
  if (res) {
    proxy.$message.success('操作成功')
    proxy.$refs['rolesFormRef'].resetFields()
    dialogVisible.value = false
    await getRolesList()
  }
}
//处理分页
const handelPageChange = (currentPage) => {
  pager.pageNum = currentPage
  getRolesList()
}
//权限展示
const showPermissionDialog = (row) => {
  roleId.value = row._id
  permissionVisitable.value = true
  const { checkedKeys } = row.permissionList
  proxy.$nextTick(() => {
    proxy.$refs.permissionTree.setCheckedKeys(checkedKeys)
  })
}
//处理权限
const handelPermission = async () => {
  const halfCheckedKeys = proxy.$refs.permissionTree.getHalfCheckedKeys()
  const checkedNodes = proxy.$refs.permissionTree.getCheckedNodes()
  const checkIds = []
  const parentCheckedIds = []
  checkedNodes.map(node => {
    if (!node.children) {
      checkIds.push(node._id)
    } else {
      parentCheckedIds.push(node._id)
    }
  })
  const params = {
    _id: roleId.value,
    permissionList: {
      checkedKeys: checkIds,
      halfCheckKeys: parentCheckedIds.concat(halfCheckedKeys)
    }
  }
  const res = await proxy.$api.updatePermission(params)
  if (res) {
    proxy.$message.success('编辑成功')
    permissionVisitable.value = false
    await getRolesList()
  }
}

const actionMap = (list) => {
  const actions = {}
  const deep = (arr) => {
    while (arr.length) {
      const item = arr.pop()
      if (item.children && item.action) {
        actions[item._id] = item.menuName
      }

      if (item.children && !item.action) {
        deep(item.children)
      }
    }
  }
  deep(JSON.parse(JSON.stringify(list)))
  actionsMap.value = actions


}
</script>

<style>

</style>