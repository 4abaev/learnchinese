export interface IBannerAboutFields {
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
    title: string
    summary: string
    description_subscribe: string
    button_to_read_more: string
    subtitles: Subtitle[]
    localizations: Localizations
  }
  
  export interface Subtitle {
    id: number
    text: string
  }
  
  export interface Localizations {
    data: Daum[]
  }
  
  export interface Daum {
    id: number
    attributes: Attributes2
  }
  
  export interface Attributes2 {
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    title: string
    summary: any
    description_subscribe: any
    button_to_read_more: any
  }
  
  export interface Meta {}
  