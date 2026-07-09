import { NextResponse } from 'next/server'
import { getDownloadURL } from '../../../lib/googleDrive'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const dl = await getDownloadURL(id)
  return NextResponse.redirect(dl)
}
