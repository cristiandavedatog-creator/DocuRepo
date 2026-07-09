import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const logs = await prisma.activityLog.findMany({ include: { user: true, document: true }, orderBy: { createdAt: 'desc' }, take: 200 })
  return NextResponse.json(logs)
}
