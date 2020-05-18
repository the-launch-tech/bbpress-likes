import { AxiosStatic } from 'axios'

export interface IHttpLikesService {
  Http: AxiosStatic
  getRepliesState: (args: IRepliesStateArgs) => Promise<IStateReplies>
  getTopicState: (args: ITopicStateArgs) => Promise<IStateTopic>
  likeReply: (args: ILikeArgs) => Promise<ILikeResponse>
}

export interface IPage {
  isNotThreadPage: () => boolean
  isUserPage: () => boolean
  searchForTopic: (selector: string) => Element | null
  parseNicename: () => string
  wrapperDOM: Element | null
  userPageDOM: Element | null
  findReplies: (selector: string, callback: Function) => any[]
}

export interface ITopic {
  id: number
  el: Element
  parseId: (topicDOM: Element) => number
  loadReplies: (replyEl: string) => Promise<IReply[]>
  loadInitialState: (topic: IStateTopic, callback: any) => void
  likesHtml: (position: string) => string
  appendTotalLikesDOM: (wrapperDOM: Element | null) => void
  updateTotalLikes: (liked: boolean, callback: any) => void
  updateAppendedTotalLikesDOM: () => void
}

export type IStateTopic = number

export interface IStateReply {
  replyId: number
  currentLikes: number
  authLiked: boolean
}

export interface IStateReplies {
  [id: string]: IStateReply
}

export interface IReply {
  el: Element
  metaDOM: Element | null
  id: number
  topicId: number
  LikeButton: ILikeButton
  addLikeButton: () => void
}

export interface ILikeButton {
  className: string
  replyId: number
  topicId: number
  currentLikeCount: number | string
  authLiked: boolean
  el: Element | null
  parseLikes: (likes: string) => number | string
  buttonHtml: () => string
  setButton: () => void
  onLike: (callback: any) => Promise<boolean>
  loadInitialState: (replies: IStateReply) => void
  isLiking: () => boolean | null
}

export interface ILikeResponse {
  currentLikes: number
  authLiked: boolean
}

export interface IRepliesStateArgs {
  topic: number
  auth: number
  replies: number[]
}

export interface ITopicStateArgs {
  topic: number
  nicename: string
}

export interface ILikeArgs {
  topic: number
  auth: number
  reply: number
  nicename: string
}
