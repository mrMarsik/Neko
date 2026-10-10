import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

import { randomUUID } from 'crypto'


const databasePath = path.join(
  process.cwd(),
  'lumen-db/database/lumen.db'
)

const schemaPath = path.join(
  process.cwd(),
  'lumen-db/database/schema.sql'
)


export const db = new Database(databasePath)

const schema = fs.readFileSync(
  schemaPath,
  'utf8'
)

db.exec(schema)


export type MediaRecord = {
  id: string
  type: string
  name: string
  description: string
  tags: string
  mime: string
  size: number
  sourceUrl: string
  path: string
  createdAt: number
}


type SaveMediaInput = {
  sourceUrl: string
  tempPath: string
  mime: string
  size: number
  name: string
  description: string
  tags: string[]
}


export function saveMedia(
  input: SaveMediaInput
): MediaRecord {

  const id = randomUUID()

  const relativePath = path.join(
    'lumen/media/files',
    id
  )

  const finalPath = path.join(
    process.cwd(),
    relativePath
  )


  fs.renameSync(
    input.tempPath,
    finalPath
  )


  const media: MediaRecord = {
    id,
    type: 'file',
    name: input.name,
    description: input.description,
    tags: JSON.stringify(input.tags),
    mime: input.mime,
    size: input.size,
    sourceUrl: input.sourceUrl,
    path: relativePath,
    createdAt: Date.now()
  }


  db.prepare(`
    INSERT INTO media (
      id,
      type,
      name,
      description,
      tags,
      mime,
      size,
      sourceUrl,
      path,
      createdAt
    )
    VALUES (
      @id,
      @type,
      @name,
      @description,
      @tags,
      @mime,
      @size,
      @sourceUrl,
      @path,
      @createdAt
    )
  `).run(media)


  return media
}


export function getMedia(
  id: string
): MediaRecord | undefined {

  return db.prepare(`
    SELECT *
    FROM media
    WHERE id = ?
  `).get(id) as MediaRecord | undefined
}


export function findMedia(
  query: string
): MediaRecord[] {

  const like = `%${query}%`

  return db.prepare(`
    SELECT *
    FROM media
    WHERE name LIKE ?
       OR description LIKE ?
       OR tags LIKE ?
    ORDER BY createdAt DESC
    LIMIT 50
  `).all(
    like,
    like,
    like
  ) as MediaRecord[]
}
