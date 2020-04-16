import buttonHtml from '../helpers/buttonHtml'

const { log, error } = console

export default function(replyHeaders, dom, topicId) {
  return Array.from(replyHeaders).map((header, i) => {
    const replyId = header.id.replace(/\D/g, '')

    if (replyId === topicId) {
      return
    }

    const headerMeta = header.querySelector(dom.replyHeaderMetaEl)

    headerMeta.innerHTML += buttonHtml({
      className: dom.appendedReplyLikeEl,
      replyId,
      currentLikeCount: 0,
      authLiked: false,
    })

    return headerMeta.querySelector(dom.appendedReplyLikeEl)
  })
}
