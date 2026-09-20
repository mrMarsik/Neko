 export default class NekoChat {

  constructor(element) {
    this.element = element

    this.screen = element.querySelector('.screen')
    this.messages = element.querySelector('.messages')
    this.typing = element.querySelector('.typing')

    this.input = element.querySelector('#message-input')
    this.send = element.querySelector('#send')

    this.init()
  }


  init() {
    this.send.addEventListener('click', () => this.sendMessage())

    this.input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.sendMessage()
      }
    })
  }


  sendMessage() {
    const text = this.input.value.trim()

    if (!text) return

    this.addMessage(text, 'user')
    this.input.value = ''
  }


  addMessage(text, author) {
    const message = document.createElement('div')

    message.classList.add(`message-${author}`)
    message.textContent = text

    this.messages.append(message)
    this.scrollDown()
  }


  scrollDown() {
    this.messages.scrollTop = this.messages.scrollHeight
  }

}