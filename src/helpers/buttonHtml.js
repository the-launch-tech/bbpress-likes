import parseLikes from './parseLikes'

export default function({ className, replyId, authLiked, currentLikeCount }) {
  return `<span data-id="${replyId}" data-auth="${
    authLiked ? 'liked' : 'not-liked'
  }" data-count="${currentLikeCount}" class="${className.substr(1)} ${
    authLiked ? 'btn-liked' : ''
  }"><i class="fas fa-heart"></i> ${parseLikes(currentLikeCount)}</span>`
}
