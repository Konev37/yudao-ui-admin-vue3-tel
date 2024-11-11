import request from '@/config/axios'

// 消防栓 VO
export interface FireVO {
  id: number // 消防栓id
  infrastructureId: number // 基础设施id
  maintenanceDate: Date // 维护日期
  maintainer: string // 维护人
  productModel: string // 产品型号
  type: string // 类型
  status: string // 状态
}

// 消防栓 API
export const FireApi = {
  // 查询消防栓分页
  getFirePage: async (params: any) => {
    return await request.get({ url: `/fire/page`, params })
  },

  // 查询消防栓详情
  getFire: async (id: number) => {
    return await request.get({ url: `/fire/get?id=` + id })
  },

  // 新增消防栓
  createFire: async (data: FireVO) => {
    return await request.post({ url: `/fire/create`, data })
  },

  // 修改消防栓
  updateFire: async (data: FireVO) => {
    return await request.put({ url: `/fire/update`, data })
  },

  // 删除消防栓
  deleteFire: async (id: number) => {
    return await request.delete({ url: `/fire/delete?id=` + id })
  },

  // 导出消防栓 Excel
  exportFire: async (params) => {
    return await request.download({ url: `/fire/export-excel`, params })
  }
}
