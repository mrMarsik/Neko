export default class NekoChat {

  constructor(element, socket) {
    this.element = element
    this.socket = socket

    this.screen = element.querySelector('.screen')
    this.messages = element.querySelector('.messages')
    this.typing = element.querySelector('.typing')

    this.input = element.querySelector('#message-input')
    this.send = element.querySelector('#send')

    this.init()
  }


  init() {
    this.send.disabled = true

    this.socket.addEventListener('open', () => {
      console.log('Neko connected')

      this.send.disabled = false
    })

    this.socket.addEventListener('message', event => {
      this.addMessage(event.data, 'neko')
    })

    this.send.addEventListener('click', () => {
      this.sendMessage()
    })

    this.input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.sendMessage()
      }
    })
  }


  sendMessage() {
    const text = this.input.value.trim()

    if (!text) return
    if (this.socket.readyState !== WebSocket.OPEN) return

    const packet = {
      id: crypto.randomUUID(),
      type: 'text',
      content: text,
      timestamp: Date.now()
    }

    this.socket.send(JSON.stringify(packet))

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


const socket = new WebSocket('ws://localhost:2002')

new NekoChat(document, socket)