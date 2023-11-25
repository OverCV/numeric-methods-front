
export interface RequestConstant {
  name: string
  value: number
}

export interface CreateConstant extends RequestConstant { }

export interface UpdateConstant extends RequestConstant { }

export interface ConstantResponse extends RequestConstant {
  id: number
  approximation_id: number
}