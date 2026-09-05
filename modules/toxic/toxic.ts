import { Message } from "discord.js"
import { replies } from "./ai"


export class AngryNeko {

  


  run(bullshit : string) {

    return this.FuckYou()

  }


  FuckYou() {
    
    const cryBaby = replies[Math.floor(Math.random() * replies.length)]

    return cryBaby

  }

  
}