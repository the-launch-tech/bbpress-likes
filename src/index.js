import 'core-js/stable'
import 'regenerator-runtime/runtime'
import BBPressService from './services/BBPressService'
import getTopicId from './helpers/getTopicId'
import getUserProfileNicename from './helpers/getUserProfileNicename'
import buttonHtml from './helpers/buttonHtml'
import handleLike from './utils/handleLike'
import initializeButtonDom from './utils/initializeButtonDom'
import insertInitialState from './utils/insertInitialState'
import './scss/_main.scss'

const { log, error } = console

async function BBPressLikes({ nonce, authId, dom, baseUrl }) {
  const topicId = getTopicId(dom.topicIdEl)
  const nicename = getUserProfileNicename()

  const replyHeaders = document.querySelectorAll(dom.replyHeaderEl)

  if (!replyHeaders || !topicId) {
    return
  }

  const likeButtons = await Promise.all(initializeButtonDom(replyHeaders, dom, topicId))

  const { replies } = await BBPressService.getInitialState({ topicId, authId, nicename })

  await insertInitialState(replies, dom)

  likeButtons.filter(Boolean).map(button => {
    button.addEventListener('click', e => handleLike(e, button, topicId, authId))
  })
}

window.addEventListener('load', e => {
  BBPressLikes($BBPLikes)
})
