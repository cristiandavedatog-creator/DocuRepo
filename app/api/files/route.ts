import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const docs = await prisma.document.findMany({ include: { category: true, uploadedBy: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(docs)
}
