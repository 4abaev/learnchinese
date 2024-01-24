export interface IGlobalFields {
    data: Data
    meta: Meta
  }
  
  export interface Data {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    guide_video: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
  }
  
  export interface Meta {}
  