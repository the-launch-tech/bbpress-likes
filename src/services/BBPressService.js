import Http from './Http'

const { log, error } = console

export default {
  getInitialState: async ({ topicId, authId }) => {
    try {
      const { data } = await Http.get(`/topics/${topicId}/replies/all/auth/${authId}`)
      return data
    } catch (err) {
      throw err
    }
  },
  likeReply: async ({ topicId, replyId, authId }) => {
    try {
      const { data } = await Http.put(`/topics/${topicId}/replies/${replyId}/auth/${authId}`)
      return data
    } catch (err) {
      throw err
    }
  },
}
