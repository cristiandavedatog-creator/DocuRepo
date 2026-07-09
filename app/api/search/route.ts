import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || ''
  if (!q) return NextResponse.json([])
  const docs = await prisma.document.findMany({
    where: {
      OR: [
        { title: { contains: q } },
      ]
    }, include: { category: true, uploadedBy: true }
  })
  return NextResponse.json(docs)
}
