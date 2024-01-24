export interface ISubInfoPageFields {
    data: Data
    meta: Meta
  }
  
  export interface Data {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    first_text: string
    second_text: string
  }
  
  export interface Meta {}
  