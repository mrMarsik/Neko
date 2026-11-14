import { startPort } from './port'
import { sendDark, startDarkPort } from './dark-port'
import { startMediaServer } from './media-server'

import { download } from './courier/courier'
import { inspect } from './inspector/inspector'
import { describe } from './scribe/scribe'

import {
  saveMedia,
  getMedia,
  findMedia
} from './database/database'

import type {
  Packet,
  ToolPacket,
  ResultPacket
} from '../types'


async function receive(packet: Packet) {
  if (packet.type !== 'tool') return
  console.log('REC')
  switch (packet.tool) {
    case 'getMedia':
      await handleGetMedia(packet)
      break

    case 'findMedia':
      await handleFindMedia(packet)
      break
  }
}


async function darkReceive(packet: Packet) {
  if (packet.type !== 'tool') return
  
  switch (packet.tool) {
    case 'saveMedia':
      await handleSaveMedia(packet)
      break
  }
}


async function handleSaveMedia(packet: ToolPacket) {
  const url = packet.data.url
console.log('saveMedia')
  if (typeof url !== 'string') return


  const downloaded = await download(url)
  if (!downloaded) return


  const inspection = await inspect(downloaded.path)
  if (!inspection.safe) {
    console.log('rejected:', downloaded.path)
    return
  }


  const description = await describe({
    path: downloaded.path,
    mime: inspection.mime,
    size: inspection.size
  })


  const media = saveMedia({
    sourceUrl: url,
    tempPath: downloaded.path,
    mime: inspection.mime,
    size: inspection.size,
    name: description.name,
    description: description.description,
    tags: description.tags
  })
  
  const resultPacket: ResultPacket = {
    type: 'result',

    to: 'neko',

    taskId: packet.taskId,
    stepId: packet.stepId,
    success: true,
    data: {
  mediaUrl: `http://localhost:7000/media/${media.id}`
},

    timestamp: Date.now()
  }

  sendDark(resultPacket)

  console.log('saved:', media.name)
}


async function handleGetMedia(packet: ToolPacket) {
  const mediaId = packet.data.mediaId

  if (typeof mediaId !== 'string') return

  const media = getMedia(mediaId)

  console.log('getMedia:', media)
}


async function handleFindMedia(packet: ToolPacket) {
  const query = packet.data.query

  if (typeof query !== 'string') return

  const result = findMedia(query)

  console.log('[LUMEN] findMedia:', result)
}


startPort(receive)
startDarkPort(darkReceive)
startMediaServer()
