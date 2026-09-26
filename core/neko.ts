import { WebSocketServer } from 'ws'


class Neko {

  private socket = new WebSocketServer({
    port: 2000
  })


  start() {
    console.log('Neko: ws://localhost:2000')

    this.socket.on('connection', client => {

      console.log('Neko → Bridge')


      client.on('message', async message => {
        const response = await this.receive(message.toString())

        client.send(response)
      })

    })
  }


  async receive(input: string) {
    console.log('Neko received:', input)

    return this.think(input)
  }


  private async think(input: string) {
    return `Neko: ${input}`
  }

}


new Neko().start()