import Reply from './Reply'

import * as Config from '../config'

import { IReply, IStateTopic, ITopic } from '../tsconf'

export default class Topic {
  public id: number
  public el: Element
  public totalLikes: number

  constructor(topicDOM: Element) {
    this.el = topicDOM
    this.id = this.parseId(topicDOM)
    this.totalLikes = 0

    this.updateAppendedTotalLikesDOM = this.updateAppendedTotalLikesDOM.bind(this)
  }

  parseId(topicDOM: Element): number {
    if (topicDOM) {
      return parseInt(topicDOM.id.replace(/\D/g, ''))
    }
    return 0
  }

  async loadReplies(replyEl: string): Promise<IReply[]> {
    const replies: IReply[] = await Promise.all(
      Array.from(document.querySelectorAll(replyEl) || []).map(
        (replyDOM: Element): Promise<IReply> => {
          return new Promise(res => {
            const ReplyInstance: IReply = new Reply(this.id, replyDOM)
            ReplyInstance.addLikeButton()
            res(ReplyInstance)
          })
        }
      )
    )

    return replies
  }

  loadInitialState(totalLikes: IStateTopic, callback: any): void {
    this.totalLikes = totalLikes
    if (typeof callback === 'function') {
      callback()
    }
  }

  likesHtml(position: string): string {
    return `<span class="bbplikes-topic-likes bbplikes-topic-${position}"><i class="fas fa-heart"></i> ${this.totalLikes}</span>`
  }

  appendTotalLikesDOM(wrapperDOM: Element | null): void {
    if (!!wrapperDOM) {
      wrapperDOM.innerHTML += this.likesHtml('top')
    }
  }

  updateTotalLikes(liked: boolean, callback: ITopic['updateAppendedTotalLikesDOM']): void {
    liked ? this.totalLikes++ : this.totalLikes--
    if (typeof callback === 'function') {
      callback()
    }
  }

  updateAppendedTotalLikesDOM(): void {
    Array.from(document.querySelectorAll(Config.topicLikesEl) || []).map(el => {
      el.innerHTML = `<i class="fas fa-heart"></i> ${this.totalLikes}`
    })
  }
}
