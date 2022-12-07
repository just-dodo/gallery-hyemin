export interface ImageData {
  url: string
  position: number[]
  rotation: number[]
  scale?: number[]

  width?: number
  height?: number
  caption?: string
  opacity? : number
}
