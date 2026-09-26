import WebSocket, { WebSocketServer } from 'ws'


let neko: WebSocket
let web: WebSocket | null = null


function connectNeko() {
  neko = new WebSocket('ws://localhost:2000')


  neko.on('open', () => {
    console.log('Bridge → Neko')
  })


  neko.on('message', message => {
    if (web?.readyState !== WebSocket.OPEN) return

    web.send(message.toString())
  })


  neko.on('close', () => {
    setTimeout(connectNeko, 1000)
  })


  neko.on('error', () => {
    neko.close()
  })
}


connectNeko()


const bridge = new WebSocketServer({
  port: 2001
})


bridge.on('connection', client => {
  web = client

  console.log('Bridge → Web')


  client.on('message', message => {
    if (neko.readyState !== WebSocket.OPEN) return

    neko.send(message.toString())
  })


  client.on('close', () => {
    if (web === client) {
      web = null
    }
  })
})


console.log('Bridge: ws://localhost:2001')