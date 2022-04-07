<template>
  <div class="dept-manger">
    <div class="query">
      <el-form
        ref="queryFormRef"
        :model="queryForm"
        :inline="true"
      >
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="queryForm.deptName"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="restForm('queryFormRef')">
            重置
          </el-button>
          <el-button
            type="primary"
            @click="getDeptList()"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button
          v-has="'dept-add'"
          type="primary"
          @click="showForm('create',{})"
        >
          新增
        </el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{children:'children'}"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          v-bind="item"
        />
        <el-table-column label="操作">
          <template
            #default="scope"
          >
            <el-button
              v-has="'dept-edit'"
              type="primary"
              @click="handelEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-has="'dept-delete'"
              type="danger"
              @click="handelDel(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogShow"
      :title="action==='edit'?'编辑部门':'添加部门'"
    >
      <el-form
        ref="deptFormRef"
        :rules="rules"
        label-width="140px"
        :model="deptForm"
      >
        <el-form-item
          label="上级部门"
          prop="parentId"
        >
          <el-cascader
            v-model="deptForm.parentId"
            :options="deptList"
            clearable
            placeholder="请选择父级"
            :props="{checkStrictly:true,value:'_id',label:'deptName'}"
          />
        </el-form-item>
        <el-form-item
          label="部门名称"
          prop="deptName"
        >
          <el-input
            v-model="deptForm.deptName"
            placeholder="请填写部门名称"
          />
        </el-form-item>
        <el-form-item
          label="负责人"
          prop="user"
        >
          <el-select
            v-model="deptForm.user"
            placeholder="请选择部门负责人"
            @change="setEmail"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="userEmail"
        >
          <el-input
            v-model="deptForm.userEmail"
            disabled
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="restForm('deptFormRef');dialogShow=false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >
          提交
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'Department',
  data() {
    return {
      queryForm: {
        deptName: ''
      },
      columns: [
        {
          label: '部门名称',
          prop: 'deptName'
        },
        {
          label: '负责人',
          prop: 'userName'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }
      ],
      deptList: [],
      pager: {
        pageNum: 1,
        pageSize: 10
      },
      action: '',
      dialogShow: false,
      deptForm: {
        parentId: [null]
      },
      userList: [],
      rules: {
        user: [
          {
            required: true,
            message: '请选择部门负责人',
            trigger: 'blur'
          }
        ],
        deptName: [
          {
            required: true,
            message: '请填写部门名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.getDeptList()
    this.getUserList()
  },
  methods: {
    showForm(action, row) {
      this.dialogShow = true
      this.action = action


    },
    async getUserList() {
      this.userList = await this.$api.getAllUsers()
    },
    // 获取部门列表
    async getDeptList() {
      this.deptList = await this.$api.getDeptList({ ...this.queryForm })
    },
    //
    restForm(form) {
      this.$refs[form].resetFields()
    },
    //提交
    submitForm() {
      this.$refs.deptFormRef.validate(async (valid) => {
        if (valid) {
          const params = { ...this.deptForm, action: this.action }
          delete params.user
          const res = await this.$api.operateDept(params)
          if (res) {
            this.$message.success('操作成功')
            this.dialogShow = false
            await this.getDeptList()
            this.$refs.deptFormRef.resetFields()
          }
        }
      })
    },
    handelEdit(row) {
      this.action = 'edit'
      this.dialogShow = true
      this.$nextTick(() => {
        Object.assign(this.deptForm, row, {
          user: `${row.userId}/${row.userName}/${row.userEmail}`
        })
      })

    },
    async handelDel(id) {
      await this.$api.delDept({ _id: id })
      this.$message.success('删除成功')
      await this.getDeptList()

    },
    setEmail(val) {
      const [userId, userName, userEmail] = val.split('/')
      Object.assign(this.deptForm, { userId, userName, userEmail })
    }


  }
}
</script>

<style scoped>

</style>