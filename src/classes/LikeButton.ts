import { ILikeButton, ILikeResponse, IStateReply, IHttpLikesService } from '../tsconf'

export default class LikeButton {
  public el: Element | null
  public replyId: number
  public topicId: number
  public authLiked: boolean
  public currentLikeCount: number
  public className: string

  constructor({ currentLikeCount, replyId, topicId, authLiked, className }) {
    this.replyId = replyId
    this.topicId = topicId
    this.authLiked = authLiked
    this.currentLikeCount = currentLikeCount
    this.className = className
  }

  parseLikes(likes: string | number): number | string {
    const likesInt = typeof likes == 'string' ? parseInt(likes) : likes
    if (!likesInt) {
      return 0
    } else if (likesInt < 1000) {
      return likesInt
    } else if (likesInt > 999) {
      return (likesInt / 1000).toFixed(2) + 'K'
    }
    return 0
  }

  buttonHtml(): string {
    return `<span data-id="${this.replyId}" data-auth="${
      this.authLiked ? 'liked' : 'not-liked'
    }" data-count="${this.currentLikeCount}" class="${this.className.substr(1)} ${
      this.authLiked ? 'btn-liked' : ''
    }"><i class="fas fa-heart"></i> ${this.parseLikes(this.currentLikeCount)}</span>`
  }

  setButton(): void {
    this.el = document.querySelector('span[data-id="' + this.replyId + '"]')
  }

  manipulateLikeDOM() {
    if (!this.el) {
      return
    }

    this.el.innerHTML = `<i class="fas fa-heart"></i> ${this.parseLikes(this.currentLikeCount)}`
    this.el.setAttribute('data-auth', this.authLiked ? 'liked' : 'not-liked')
    this.el.setAttribute('data-count', `${this.currentLikeCount}`)
    this.authLiked ? this.el.classList.add('btn-liked') : this.el.classList.remove('btn-liked')
  }

  loadInitialState(reply: IStateReply) {
    this.authLiked = reply.authLiked
    this.currentLikeCount = reply.currentLikes
    this.setButton()
    this.manipulateLikeDOM()
  }

  async onLike(callback: any): Promise<boolean> {
    try {
      if (!this.el || this.isLiking()) {
        return false
      }

      this.el.classList.add('like-pending')
      const data: ILikeResponse = await callback()
      this.authLiked =
        (typeof data.authLiked === 'number' && data.authLiked > 0) ||
        (typeof data.authLiked === 'boolean' && data.authLiked)
      this.currentLikeCount = data.currentLikes
      this.manipulateLikeDOM()
      this.el.classList.remove('like-pending')
      return this.authLiked
    } catch (err) {
      throw err
    }
  }

  isLiking() {
    return this.el && this.el.classList.contains('like-pending')
  }
}
