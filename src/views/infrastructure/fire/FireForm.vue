<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="基础设施id" prop="infrastructureId">
        <el-input v-model="formData.infrastructureId" placeholder="请输入基础设施id" />
      </el-form-item>
      <el-form-item label="维护日期" prop="maintenanceDate">
        <el-date-picker
          v-model="formData.maintenanceDate"
          type="date"
          value-format="x"
          placeholder="选择维护日期"
        />
      </el-form-item>
      <el-form-item label="维护人" prop="maintainer">
        <el-input v-model="formData.maintainer" placeholder="请输入维护人" />
      </el-form-item>
      <el-form-item label="产品型号" prop="productModel">
        <el-input v-model="formData.productModel" placeholder="请输入产品型号" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择类型">
<!--          <el-option label="请选择字典生成" value="" />-->
          <el-option label="手动泵" value="手动泵" />
          <el-option label="自动泵" value="自动泵" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
<!--          <el-radio value="1">请选择字典生成</el-radio>-->
          <el-radio value="使用中">使用中</el-radio>
          <el-radio value="空闲">空闲</el-radio>
          <el-radio value="损坏">损坏</el-radio>
          <el-radio value="维修中">维修中</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { FireApi, FireVO } from '@/api/infrastructure/fire'

/** 消防栓 表单 */
defineOptions({ name: 'FireForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  infrastructureId: undefined,
  maintenanceDate: undefined,
  maintainer: undefined,
  productModel: undefined,
  type: undefined,
  status: undefined
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await FireApi.getFire(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as FireVO
    if (formType.value === 'create') {
      await FireApi.createFire(data)
      message.success(t('common.createSuccess'))
    } else {
      await FireApi.updateFire(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    infrastructureId: undefined,
    maintenanceDate: undefined,
    maintainer: undefined,
    productModel: undefined,
    type: undefined,
    status: undefined
  }
  formRef.value?.resetFields()
}
</script>
