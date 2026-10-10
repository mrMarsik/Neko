import path from 'path'


export type FileDescriptionInput = {
  path: string
  mime: string
  size: number
}


export type FileDescription = {
  name: string
  description: string
  tags: string[]
}


export async function describe(
  file: FileDescriptionInput
): Promise<FileDescription> {

  const name = path.basename(file.path)


  return {
    name,
    description: `${file.mime}, ${file.size} bytes`,
    tags: []
  }
}
