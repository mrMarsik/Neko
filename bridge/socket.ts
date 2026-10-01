import WebSocket, { WebSocketServer } from 'ws'


let neko: WebSocket
let web: WebSocket | null = null
let discord: WebSocket | null = null

let bridge: WebSocketServer


function initBridge() {
  bridge = new WebSocketServer({
    port: 2001
  })

  console.log('ws://localhost:2001')
}


function connectNeko() {
  neko = new WebSocket('ws://localhost:2000')

  neko.on('open', () => {
    console.log('→ Neko')
  })

  neko.on('close', () => {
    setTimeout(connectNeko, 1000)
  })

  neko.on('error', () => {
    neko.close()
  })
}


function connectWeb() {
  web = new WebSocket('ws://localhost:2002')


  web.on('open', () => {
    console.log('→ Web')
  })


  web.on('close', () => {
    setTimeout(connectWeb, 1000)
  })


  web.on('error', () => {
    web?.close()
  })
}


function connectDiscord() {
    discord = new WebSocket('ws://localhost:2003')


  discord.on('open', () => {
    console.log('→ Discord')
  })


  discord.on('close', () => {
    setTimeout(connectDiscord, 1000)
  })


  discord.on('error', () => {
    discord?.close()
  })
}


function start() {
  initBridge()

  connectNeko()
  connectWeb()
  connectDiscord()
}


start()