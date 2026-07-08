import { NextResponse } from 'next/server'
import { uploadToDrive } from '../../../lib/googleDrive'
import { prisma } from '../../../lib/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const title = formData.get('title')?.toString() || ''
    const description = formData.get('description')?.toString() || ''
    const category = formData.get('category')?.toString() || '1'
    const u = formData.get('u')?.toString() || null
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const driveFile = await uploadToDrive({ buffer, filename: (file as any).name || 'upload', mimeType: file.type })
    const doc = await prisma.document.create({ data: {
      title: title || ((file as any).name || 'file'),
      description,
      categoryId: parseInt(category) || 1,
      googleDriveFileId: driveFile.id as string,
      mimeType: file.type,
      size: Number(buffer.length),
      uploadedById: u || ''
    }})
    await prisma.activityLog.create({ data: { action: 'Upload', userId: u || null, documentId: doc.id }})
    return NextResponse.json({ ok: true, id: driveFile.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
