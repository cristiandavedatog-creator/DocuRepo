// Use dynamic import of googleapis to avoid bundling ESM/node-core modules into Next edge build
const getAuth = async () => {
  const { google } = await import('googleapis')
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
  if (!clientEmail || !privateKey) throw new Error('Missing Google service account credentials')
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  } as any)
}

const drive = async () => {
  const { google } = await import('googleapis')
  const auth = await getAuth()
  return google.drive({ version: 'v3', auth })
}

export async function uploadToDrive({ buffer, filename, mimeType }: { buffer: Buffer; filename: string; mimeType: string }) {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
  const d = await drive()
  const res = await d.files.create({
    requestBody: {
      name: filename,
      parents: folderId ? [folderId] : undefined,
      mimeType
    },
    media: {
      mimeType,
      body: Buffer.isBuffer(buffer) ? Buffer.from(buffer) : buffer
    }
  })
  return res.data
}

export async function listFiles() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
  const q = folderId ? `'${folderId}' in parents and trashed = false` : 'trashed = false'
  const d = await drive()
  const res = await d.files.list({ q, fields: 'files(id,name,mimeType,size,createdTime)'} )
  return res.data.files || []
}

export function getDownloadURL(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

export function getPreviewURL(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

export async function deleteFile(fileId: string) {
  const d = await drive()
  await d.files.delete({ fileId })
  return true
}

export async function searchFiles(q: string) {
  const files = await listFiles()
  const keyword = q.toLowerCase()
  return files.filter(f => (f.name || '').toLowerCase().includes(keyword))
}
