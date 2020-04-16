const { log, error } = console

export default function(className) {
  const topic = document.querySelector(className)
  if (topic) {
    return topic.id.replace(/\D/g, '')
  }
  return false
}
