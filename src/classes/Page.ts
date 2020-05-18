export default class Page {
  public userPageDOM: Element | null
  public wrapperDOM: Element | null

  constructor(userPageEl: string, wrapperEl: string) {
    this.userPageDOM = document.querySelector(userPageEl)
    this.wrapperDOM = document.getElementById(wrapperEl)
  }

  isUserPage(): boolean {
    return !!this.userPageDOM
  }

  isNotThreadPage(): boolean {
    return !this.wrapperDOM
  }

  searchForTopic(selector: string): Element | null {
    return !!this.wrapperDOM ? this.wrapperDOM.querySelector(selector) : null
  }

  parseNicename(): string {
    if (!this.isUserPage()) {
      return 'global'
    }

    const paths = window.location.pathname.split('/')

    return paths.indexOf('users') < paths.length - 1 && paths.indexOf('users') > -1
      ? paths[paths.indexOf('users') + 1]
      : 'global'
  }

  findReplies(selector: string, callback: Function): any[] {
    let set: any[] = []
    const replies: Element[] = Array.from(document.querySelectorAll(selector) || [])
    if (typeof callback === 'function') {
      return replies.map(reply => callback(reply))
    } else {
      return replies
    }
  }
}
