<template>
  <div class="menu">
    <div class="query-form">
      <el-form
        ref="queryFormRef"
        :inline="true"
        :model="query"
      >
        <el-form-item
          prop="menuName"
          label="菜单名称"
        >
          <el-input
            v-model="query.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="menuState"
        >
          <el-select
            v-model="query.menuState"
            placeholder="菜单状态"
          >
            <el-option
              :value="0"
              label="所有"
            />
            <el-option
              :value="1"
              label="正常"
            />
            <el-option
              :value="2"
              label="停用"
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
          <el-button @click="handelRest('queryFormRef')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button
          v-has="'menu-add'"
          type="primary"
          @click="showForm('create','level1',{},)"
        >
          新增
        </el-button>
      </div>
      <el-table
        :data="menuList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
      >
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
              v-has="'menu-add'"
              @click="showForm('create','other',scope.row)"
            >
              新增
            </el-button>
            <el-button
              v-has="'menu-edit'"
              @click="showForm('edit','',scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-has="'menu-delete'"
              type="danger"
              @click="userDel(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加菜单-->
    <el-dialog
      v-model="menuFormVisible"
      :title="formMethod==='edit'?'编辑菜单':'新增菜单'"
    >
      <el-form
        ref="menuFormRef"
        :model="menuForm"
        :label-width="formLabelWidth"
        :rules="rules"
      >
        <el-form-item
          prop="parentId"
          label="父级菜单"
        >
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            clearable
            placeholder="请选择父级菜单"
            :props="{checkStrictly:true,value:'_id',label:'menuName'}"
          />
          <span class="parent-id">不选，则创建一级菜单</span>
        </el-form-item>
        <el-form-item
          prop="menuType"
          label="菜单类型"
        >
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">
              菜单
            </el-radio>
            <el-radio :label="2">
              按钮
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="menuName"
          label="菜单名称"
        >
          <el-input
            v-model="menuForm.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          v-show="menuForm.menuType===1"
          prop="icon"
          label="菜单图标"
        >
          <el-input
            v-model="menuForm.icon"
            placeholder="请输入菜单图标"
          />
        </el-form-item>
        <el-form-item
          v-show="menuForm.menuType===1"
          label="路由地址"
          prop="path"
        >
          <el-input
            v-model="menuForm.path"
            placeholder="请输入路由地址"
          />
        </el-form-item>
        <el-form-item
          v-show="menuForm.menuType===2"
          label="权限标识"
          prop="menuCode"
        >
          <el-input
            v-model="menuForm.menuCode"
            placeholder="请输入权限标识"
          />
        </el-form-item>
        <el-form-item
          v-show="menuForm.menuType===1"
          label="组件路径"
          prop="component"
        >
          <el-input
            v-model="menuForm.component"
            placeholder="请选择填写组件路径"
          />
        </el-form-item>
        <el-form-item
          v-show="menuForm.menuType===1"
          prop="menuState"
          label="菜单状态"
        >
          <el-radio-group
            v-model="menuForm.menuState"
            placeholder="请选择菜单状态"
          >
            <el-radio :label="1">
              正常
            </el-radio>
            <el-radio :label="2">
              停用
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handelRest('menuFormRef')">取消</el-button>
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
const query = reactive({
  menuState: 0
})
// 新增菜单验证
const rules = reactive({
  menuName: [
    {
      required: true,
      message: '请填写菜单名称',
      trigger: 'blur'
    },
    {
      min: 2,
      message: '菜单名称最短为2个字段',
      trigger: 'blur'
    },
    {
      max: 5,
      message: '菜单名称最长为5个字段',
      trigger: 'blur'
    }
  ]
  // path: [
  //   {
  //     required: true,
  //     message: '请填写路径',
  //     trigger: 'blur'
  //   }
  // ]
})
const formLabelWidth = ref('80px')
// 表单是否显示
const menuFormVisible = ref(false)
const menuForm = reactive({
  parentId: [null],
  menuType: 1,
  menuState: 1

})
// 当前操作 create新增 edit编辑
const formMethod = ref('create')
const columns = reactive([
  {
    label: '菜单名称',
    property: 'menuName'
  },
  {
    label: '图标',
    property: 'icon'
  },
  {
    label: '菜单类型',
    property: 'menuType',
    formatter(row, column, val) {
      return {
        1: '菜单',
        2: '按钮'
      }[val]
    }
  },
  {
    label: '权限标识',
    property: 'menuCode'
  },
  {
    label: '路由地址',
    property: 'path'
  },
  {
    label: '组件路径',
    property: 'component'
  },
  {
    label: '菜单状态',
    property: 'menuState',
    formatter(row, column, val) {
      return {
        1: '正常',
        2: '停用'
      }[val]
    }
  },
  {
    label: '创建时间',
    property: 'createTime',
    formatter(row, column, val) {
      return utils.FormatDate(val, 'YYYY-MM-DD HH:mm:ss')
    }
  }

])

const menuList = ref([])
onMounted(() => {
  getMenuList()
})

// 获取菜单列表
const getMenuList = async () => {
  try {
    const list = await proxy.$api.getMenuList({ ...query })
    menuList.value = list
  } catch (e) {
    proxy.$message.error('服务器异常')
    throw e
  }
}
// 处理查询
const handelQuery = () => {
  getMenuList()
}
// 处理重置
const handelRest = (form) => {
  if (form === 'menuFormRef') {
    menuFormVisible.value = false
  }
  proxy.$refs[form].resetFields()
}

// 删除菜单
const userDel = async (row) => {
  await proxy.$api.delMenu({ _id: [row._id] })
  proxy.$message.success('删除成功')
  await getMenuList()
}

// 控制表单显示
const showForm = (method, type, row) => {
  formMethod.value = method
  proxy.$nextTick(() => {
    if (type === 'other') {
      menuForm.parentId = [...row.parentId, row._id].filter((item) => item)
    }

    if (method === 'edit') {
      Object.assign(menuForm, row)
    }
  })
  menuFormVisible.value = true
}
// 提交
const submitUserCreateForm = () => {
  proxy.$refs.menuFormRef.validate(async (valid) => {
    if (valid) {
      const params = toRaw(menuForm)
      params.action = formMethod.value
      const res = await proxy.$api.createMenu(params)
      if (res) {
        menuFormVisible.value = false
        handelRest('menuFormRef')
        proxy.$message.success('操作成功')
        await getMenuList()
      }
    }
  })
}


</script>

<style lang='scss'>

.menu {
  .parent-id {
    color: gray;
    margin-left: 20px;
  }
}
</style>
