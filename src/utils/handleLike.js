import BBPressService from '../services/BBPressService'
import parseLikes from '../helpers/parseLikes'

const { log, error } = console

export default async function handleLike(e, el, topicId, authId) {
  e.preventDefault()

  try {
    el.classList.add('like-pending')

    const { authLiked, currentLikes } = await BBPressService.likeReply({
      topicId,
      replyId: el.getAttribute('data-id'),
      authId,
    })

    if (parseInt(authLiked) === 0) {
      el.innerHTML = `<i class="fas fa-heart"></i> ${parseLikes(currentLikes)}`
      el.classList.remove('btn-liked')
      el.setAttribute('data-count', currentLikes)
      el.setAttribute('data-auth', 'not-liked')
    } else {
      el.innerHTML = `<i class="fas fa-heart"></i> ${parseLikes(currentLikes)}`
      el.classList.add('btn-liked')
      el.setAttribute('data-count', currentLikes)
      el.setAttribute('data-auth', 'liked')
    }

    el.classList.remove('like-pending')

    return el
  } catch (err) {
    throw err
  }
}
