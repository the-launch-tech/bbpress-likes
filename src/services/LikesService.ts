import { AxiosResponse, AxiosError, AxiosStatic } from 'axios'

import {
  IRepliesStateArgs,
  ITopicStateArgs,
  ILikeArgs,
  ILikeResponse,
  IStateReplies,
  IStateTopic,
} from '../tsconf'

const { log, error } = console

export default class LikesService {
  public Http: AxiosStatic

  constructor(Http: AxiosStatic) {
    this.Http = Http
  }

  async getRepliesState(args: IRepliesStateArgs): Promise<IStateReplies> {
    try {
      const result: AxiosResponse<IStateReplies> = await this.Http.put(`/state/replies`, {
        topic_id: args.topic,
        auth_id: args.auth,
        replies: args.replies,
      })
      return result.data
    } catch (err) {
      throw <AxiosError>err
    }
  }

  async getTopicState(args: ITopicStateArgs): Promise<IStateTopic> {
    try {
      const result: AxiosResponse<IStateTopic> = await this.Http.get(
        `/topics/${args.topic}/profile/${args.nicename || 'global'}`
      )
      return result.data
    } catch (err) {
      throw <AxiosError>err
    }
  }

  async likeReply(args: ILikeArgs): Promise<ILikeResponse> {
    try {
      const result: AxiosResponse<ILikeResponse> = await this.Http.put(
        `/topics/${args.topic}/replies/${args.reply}/auth/${args.auth}/profile/${args.nicename ||
          'global'}`
      )
      return result.data
    } catch (err) {
      throw <AxiosError>err
    }
  }
}
