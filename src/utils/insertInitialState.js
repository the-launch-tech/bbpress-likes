import parseLikes from '../helpers/parseLikes'

const { log, error } = console

export default async function insertInitialState(replies, { replyHeaderEl, appendedReplyLikeEl }) {
  const mappedState = ({ replyId, currentLikes, authLiked }) => {
    const el = document.querySelector(`#post-${replyId}${replyHeaderEl} ${appendedReplyLikeEl}`)
    el.innerHTML = `<i class="fas fa-heart"></i> ${parseLikes(currentLikes)}`
    el.setAttribute('data-auth', authLiked ? 'liked' : 'not-liked')
    el.setAttribute('data-count', currentLikes)
    if (authLiked) {
      el.classList.add('btn-liked')
    }
    return el
  }

  const mapStateToReply = replies => {
    return replies.map(mappedState)
  }

  return await Promise.all(mapStateToReply(replies))
}
