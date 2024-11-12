<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="设施id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入基础设施id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="设施类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择设施类型"
          clearable
          class="!w-240px"
        >
          <el-option label="消防栓" value="消防栓" />
          <el-option label="垃圾桶" value="垃圾桶" />
<!--          <el-option label="请选择字典生成" value="" />-->
<!--          <el-option-->
<!--            v-for="dict in getIntDictOptions(DICT_TYPE.INFRASTRUCTURE_TYPE)"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
        </el-select>
      </el-form-item>
      <el-form-item label="设施容量" prop="capacity">
        <el-input
          v-model="queryParams.capacity"
          placeholder="请输入设施容量"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="设施配置" prop="configuration">
        <el-input
          v-model="queryParams.configuration"
          placeholder="请输入设施配置"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入地址"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input
          v-model="queryParams.longitude"
          placeholder="请输入经度"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input
          v-model="queryParams.latitude"
          placeholder="请输入纬度"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="建设时间" prop="constructionDate">
        <el-date-picker
          v-model="queryParams.constructionDate"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="选择建设时间"
          clearable
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="建设时间" prop="constructionDate">-->
<!--        <el-date-picker-->
<!--          v-model="queryParams.constructionDate"-->
<!--          value-format="YYYY-MM-DD HH:mm:ss"-->
<!--          type="daterange"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"-->
<!--          class="!w-220px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="区域id" prop="areaId">
        <el-input
          v-model="queryParams.areaId"
          placeholder="请输入区域id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="创建人id" prop="creatorId">
        <el-input
          v-model="queryParams.creatorId"
          placeholder="请输入创建人id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt">
        <el-date-picker
          v-model="queryParams.createdAt"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="选择创建时间"
          clearable
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['infrastructure:infrastr:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['infrastructure:infrastr:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="基础设施id" align="center" prop="id" />
      <el-table-column label="设施类型" align="center" prop="type" />
      <el-table-column label="设施容量" align="center" prop="capacity" />
      <el-table-column label="设施配置" align="center" prop="configuration" />
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="经度" align="center" prop="longitude" />
      <el-table-column label="纬度" align="center" prop="latitude" />
<!--      <el-table-column label="建设时间" align="center" prop="constructionDate" />-->
      <el-table-column
        label="建设时间"
        align="center"
        prop="constructionDate"
        :formatter="dateFormatter2"
        width="180px"/>
      <el-table-column label="区域id" align="center" prop="areaId" />
      <el-table-column label="创建人id" align="center" prop="creatorId" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createdAt"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" min-width="120px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['infrastructure:infrastr:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['infrastructure:infrastr:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <InfrastructureForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import {dateFormatter, dateFormatter2} from '@/utils/formatTime'
import download from '@/utils/download'
import { InfrastructureApi, InfrastructureVO } from '@/api/infrastructure/infrastr'
import InfrastructureForm from './InfrastructureForm.vue'
import {DICT_TYPE, getIntDictOptions} from "@/utils/dict";

/** 基础设施 列表 */
defineOptions({ name: 'Infrastructure' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<InfrastructureVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  id: undefined,
  type: undefined,
  capacity: undefined,
  configuration: undefined,
  address: undefined,
  longitude: undefined,
  latitude: undefined,
  constructionDate: [],
  areaId: undefined,
  creatorId: undefined,
  createdAt: undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await InfrastructureApi.getInfrastructurePage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await InfrastructureApi.deleteInfrastructure(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await InfrastructureApi.exportInfrastructure(queryParams)
    download.excel(data, '基础设施.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
