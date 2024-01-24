export interface IMetadata {
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
    metadata: Metadata
    localizations: Localizations
  }
  
  export interface Metadata {
    id: number
    title: string
    description: string
    keywords: string
  }
  
  export interface Localizations {
    data: any[]
  }
  
  export interface Meta {}
  