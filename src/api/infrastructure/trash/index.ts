import request from '@/config/axios'

// 垃圾桶 VO
export interface TrashVO {
  id: number // id
  infrastructureId: number // 基础设施id
  hasClassification: boolean // 是否有分类功能
  productModel: string // 产品型号
  status: string // 状态
}

// 垃圾桶 API
export const TrashApi = {
  // 查询垃圾桶分页
  getTrashPage: async (params: any) => {
    return await request.get({ url: `/infrastructure/trash/page`, params })
  },

  // 查询垃圾桶详情
  getTrash: async (id: number) => {
    return await request.get({ url: `/infrastructure/trash/get?id=` + id })
  },

  // 新增垃圾桶
  createTrash: async (data: TrashVO) => {
    return await request.post({ url: `/infrastructure/trash/create`, data })
  },

  // 修改垃圾桶
  updateTrash: async (data: TrashVO) => {
    return await request.put({ url: `/infrastructure/trash/update`, data })
  },

  // 删除垃圾桶
  deleteTrash: async (id: number) => {
    return await request.delete({ url: `/infrastructure/trash/delete?id=` + id })
  },

  // 导出垃圾桶 Excel
  exportTrash: async (params) => {
    return await request.download({ url: `/infrastructure/trash/export-excel`, params })
  }
}
