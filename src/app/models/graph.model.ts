export interface BaseGraph {
  title: string
  image_url: string
  error_url: string

  solution: number
}

export interface ReadGraph extends BaseGraph {
  id: number
  approximation_id: number
}