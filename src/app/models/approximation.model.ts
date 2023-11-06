export interface BaseApproximation {
    title: string

    t0: number
    x0: number
    t: number

    h: number
    N: number
}

export interface CreateApproximation extends BaseApproximation { }

export interface ApproxUpdate extends BaseApproximation {
    title: string
    f: string

    t0: number
    x0: number
    t: number

    h: number
    N: number
}

export interface ApproxRead extends BaseApproximation {
    x: number
    f: string
    id: number

    //![]] constants: List[ConstantRead] = []
    //![]] graphs: List[GraphRead] = []
}

