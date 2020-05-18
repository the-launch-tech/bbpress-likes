import Page from './classes/Page'
import Topic from './classes/Topic'
import Reply from './classes/Reply'
import LikesService from './services/LikesService'
import Http from './services/Http'
import * as CONFIG from './config'

import {
  IHttpLikesService,
  IPage,
  ITopic,
  IReply,
  IStateReplies,
  IStateTopic,
  ILikeButton,
  ILikeResponse,
} from './tsconf'

import './scss/_main.scss'

export default async function main({ nonce, authId }): Promise<void> {
  try {
    const HttpLikesService: IHttpLikesService = new LikesService(Http(nonce))

    const CurrentPage: IPage = new Page(CONFIG.userPageSelector, CONFIG.wrapperSelector)

    if (CurrentPage.isNotThreadPage()) {
      return
    }

    const topicDOM: Element | null = CurrentPage.searchForTopic(CONFIG.topicSelector)

    const replyIds: any[] = CurrentPage.findReplies(
      CONFIG.headerSelector,
      (reply: Element): number => {
        return Reply.parseId(reply)
      }
    )

    if (!topicDOM || !replyIds.length) {
      return
    }

    const ActiveTopic: ITopic = new Topic(topicDOM)

    const repliesState: IStateReplies = await HttpLikesService.getRepliesState({
      topic: ActiveTopic.id,
      auth: authId,
      replies: replyIds,
    })

    const totalLikes: IStateTopic = await HttpLikesService.getTopicState({
      topic: ActiveTopic.id,
      nicename: CurrentPage.parseNicename(),
    })

    ActiveTopic.loadInitialState(totalLikes, (): void => {
      ActiveTopic.appendTotalLikesDOM(CurrentPage.wrapperDOM)
    })

    ActiveTopic.loadReplies(CONFIG.headerSelector).then((replies: IReply[]): void => {
      replies.map((ThreadReply: IReply): void => {
        if (!repliesState[`reply-${ThreadReply.id}`] || !ThreadReply.LikeButton) {
          return
        }

        ThreadReply.LikeButton.loadInitialState(repliesState[`reply-${ThreadReply.id}`])

        ThreadReply.LikeButton.el &&
          ThreadReply.LikeButton.el.addEventListener(
            'click',
            async (event: MouseEvent): Promise<void> => {
              event.preventDefault()

              if (ThreadReply.LikeButton.isLiking()) {
                return
              }

              const liked: boolean = await ThreadReply.LikeButton.onLike(
                async (): Promise<ILikeResponse> =>
                  await HttpLikesService.likeReply({
                    topic: ThreadReply.topicId,
                    reply: ThreadReply.id,
                    auth: authId,
                    nicename: 'global',
                  })
              )

              ActiveTopic.updateTotalLikes(liked, ActiveTopic.updateAppendedTotalLikesDOM)
            }
          )
      })
    })
  } catch (err) {
    throw err
  }
}
