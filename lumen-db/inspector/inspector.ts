import fs from 'fs/promises'


export type Inspection = {
  safe: boolean
  mime: string
  size: number
}


export async function inspect(
  filePath: string
): Promise<Inspection> {

  const stat = await fs.stat(filePath)


  return {
    safe: stat.isFile(),
    mime: 'application/octet-stream',
    size: stat.size
  }
}
