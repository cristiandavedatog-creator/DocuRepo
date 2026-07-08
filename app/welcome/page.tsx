'use client'
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import LoginCard from '../../components/LoginCard'

export default function Welcome(){
  const { data: session, status } = useSession()
  const signedIn = status === 'authenticated'

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <span className="inline-flex items-center gap-3 rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Secure access
            </span>
            <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white">Welcome to the document portal</h1>
            <p className="mt-6 max-w-xl text-slate-400 leading-8">Manage official documents, search files, preview content, and download securely from a central repository.</p>
            <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Your toolkit</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Browse and explore</h2>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">✓</span>
                  Browse documents
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">✓</span>
                  Search file contents
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">✓</span>
                  Preview PDFs
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">✓</span>
                  Download files
                </li>
              </ul>
            </div>
          </section>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            {status === 'loading' ? (
              <div className="flex min-h-[320px] items-center justify-center">
                <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-emerald-400/40 border-t-emerald-400" />
              </div>
            ) : signedIn ? (
              <div className="space-y-6">
                <div className="rounded-[1.75rem] bg-slate-950/85 p-8 text-center">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Logged in</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Ready to explore</h2>
                  <p className="mt-3 text-slate-400">Continue to your repository or log out when you’re done.</p>
                </div>
                <div className="grid gap-4">
                  <Link href="/repository" className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">Open Repository</Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/welcome' })}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <LoginCard />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
