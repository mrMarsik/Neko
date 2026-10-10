import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'


const databasePath = path.join(
  process.cwd(),
  'storage/database/storage.db'
)

const schemaPath = path.join(
  process.cwd(),
  'storage/database/schema.sql'
)


export const db = new Database(databasePath)


const schema = fs.readFileSync(
  schemaPath,
  'utf8'
)

db.exec(schema)