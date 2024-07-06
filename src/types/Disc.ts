export type VideoType = {
  resolution: string
  aspect: string
  color: string
  duration: string
}

export type TrailType = {
  codec: string
  channels: string
}

export type AudioType = {
  language: string
  trails: TrailType[]
}

export type SubtitleType = {
  language: string
  feature?: string
}

export type ExtraType = {
  title: string
  duration?: string
}

export default interface DiscType {
  _id: string
  title: string
  type: 'bd' | 'dvd'
  video: VideoType
  audio: AudioType[]
  subtitles: SubtitleType[]
  extras?: ExtraType[]
  createdAt: Date
}
