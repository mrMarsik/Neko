import express from 'express'
import path from 'path'
import WebSocket, { WebSocketServer } from 'ws'
import type { Server } from 'http'


class WebServer {

  private app = express()
  private server: Server | null = null
  private bridge!: WebSocket


  private connectBridge() {
    this.bridge = new WebSocket('ws://localhost:2001')


    this.bridge.on('open', () => {
      console.log('Web → Bridge')
    })


    this.bridge.on('close', () => {
      setTimeout(() => this.connectBridge(), 1000)
    })


    this.bridge.on('error', () => {
      this.bridge.close()
    })
  }


  start() {
    this.connectBridge()

    const webPath = path.join(process.cwd(), 'web')

    this.app.use(express.static(webPath))


    this.server = this.app.listen(2002, () => {
      console.log('Server: http://localhost:2002')
    })


    const socket = new WebSocketServer({
      server: this.server
    })


    socket.on('connection', browser => {

      browser.on('message', message => {
        if (this.bridge.readyState !== WebSocket.OPEN) return

        this.bridge.send(message.toString())
      })


      this.bridge.on('message', message => {
        if (browser.readyState !== WebSocket.OPEN) return

        browser.send(message.toString())
      })

    })
  }

}


new WebServer().start()