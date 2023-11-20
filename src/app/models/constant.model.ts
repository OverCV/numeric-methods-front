
export interface BaseConstant {
  name: string
  value: number
}

export interface CreateConstant extends BaseConstant { }

export interface UpdateConstant extends BaseConstant { }

export interface ReadConstant extends BaseConstant {
  id: number
  approximation_id: number
}