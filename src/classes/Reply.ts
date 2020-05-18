import { IReply, IStateReply, IHttpLikesService, ILikeButton } from '../tsconf'
import * as Config from '../config'

import LikeButton from './LikeButton'

export default class Reply {
  public el: Element
  public metaDOM: Element | null
  public id: number
  public topicId: number
  public LikeButton: ILikeButton

  constructor(topicId: number, replyDOM: Element) {
    this.topicId = topicId
    this.el = replyDOM
    this.id = Reply.parseId(replyDOM)
  }

  static parseId(replyDOM: Element): number {
    if (replyDOM) {
      return parseInt(replyDOM.id.replace(/\D/g, ''))
    }
    return 0
  }

  addLikeButton() {
    if (this.id === this.topicId) {
      return
    }

    this.metaDOM = this.el.querySelector(Config.metaSelector)

    if (!this.metaDOM) {
      return
    }

    this.LikeButton = new LikeButton({
      className: Config.likeSelector,
      replyId: this.id,
      topicId: this.topicId,
      currentLikeCount: 0,
      authLiked: false,
    })

    this.metaDOM.innerHTML += this.LikeButton.buttonHtml()
  }
}
