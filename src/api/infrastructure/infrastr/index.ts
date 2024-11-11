import request from '@/config/axios'

// 基础设施 VO
export interface InfrastructureVO {
  id: number // 基础设施id
  type: string // 设施类型
  capacity: number // 设施容量
  configuration: string // 设施配置
  address: string // 地址
  longitude: number // 经度
  latitude: number // 纬度
  constructionDate: Date // 建设时间
  areaId: number // 区域id
  creatorId: number // 创建人id
  createdAt: Date // 创建时间
}

// 基础设施 API
export const InfrastructureApi = {
  // 查询基础设施分页
  getInfrastructurePage: async (params: any) => {
    return await request.get({ url: `/infrastructure/infrastr/page`, params })
  },

  // 查询基础设施详情
  getInfrastructure: async (id: number) => {
    return await request.get({ url: `/infrastructure/infrastr/get?id=` + id })
  },

  // 新增基础设施
  createInfrastructure: async (data: InfrastructureVO) => {
    return await request.post({ url: `/infrastructure/infrastr/create`, data })
  },

  // 修改基础设施
  updateInfrastructure: async (data: InfrastructureVO) => {
    return await request.put({ url: `/infrastructure/infrastr/update`, data })
  },

  // 删除基础设施
  deleteInfrastructure: async (id: number) => {
    return await request.delete({ url: `/infrastructure/infrastr/delete?id=` + id })
  },

  // 导出基础设施 Excel
  exportInfrastructure: async (params) => {
    return await request.download({ url: `/infrastructure/infrastr/export-excel`, params })
  }
}
