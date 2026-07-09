import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const docs = await prisma.document.findMany({ include: { category: true, uploadedBy: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(docs)
}
