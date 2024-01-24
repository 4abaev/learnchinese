export interface IFooterFields {
    data: Data
    meta: Meta
  }
  
  export interface Data {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    email: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    telegram: string
    support: string
    grants: string
    ip: string
    inn: string
    localizations: Localizations
  }
  
  export interface Localizations {
    data: Daum[]
  }
  
  export interface Daum {
    id: number
    attributes: Attributes2
  }
  
  export interface Attributes2 {
    email: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    telegram: string
    support: string
    grants: string
    ip: string
    inn: string
  }
  
  export interface Meta {}
  