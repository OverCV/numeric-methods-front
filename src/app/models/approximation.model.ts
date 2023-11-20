import { ReadGraph } from './graph.model'
import { ReadConstant } from './constant.model'

export interface BaseApproximation {
    title: string
    f: string

    ind_var: string
    ind_value: number

    dep_var: string
    dep_value: number

    eval_value: number

    h: number
    N: number
}

export interface CreateApprox extends BaseApproximation { }

export interface UpdateApprox extends BaseApproximation { }

export interface ReadApprox extends BaseApproximation {
    result: number
    f: string
    id: number

    graphs: ReadGraph[]
    constants: ReadConstant[]
}