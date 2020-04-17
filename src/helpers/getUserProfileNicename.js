const { log, error } = console

export default function(className) {
  if (window.location.pathname.includes('/forums/users/')) {
    const partArr = window.location.pathname.split('/')
    const filteredArr = partArr.filter(el => el.length > 0)
    const usersIndex = filteredArr.indexOf('users')
    if (usersIndex > -1 && usersIndex <= filteredArr.length - 1) {
      return filteredArr[usersIndex + 1]
    }
  }
  return 'archive'
}
