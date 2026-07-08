'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginCard(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('credentials', { redirect: false, username, password })
    setLoading(false)
    if (res?.ok) {
      window.location.href = 'https://drive.google.com/drive/folders/136pbur2g4MP6fDIzLFHPGdEdV-xE-U5z?usp=drive_link'
    } else {
      setError(res?.error || 'Invalid credentials')
    }
  }

  return (
    <form className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]" onSubmit={submit}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-white">Connect</h2>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">Secure</span>
        </div>
        <p className="text-sm leading-6 text-slate-400">Sign in with your account to continue to the repository.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-300">Email</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="email"
          placeholder="Email@address.com"
          className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-3xl bg-emerald-400 px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={loading}
      >
        {loading ? 'Connecting…' : 'CONNECT'}
      </button>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Forgot your password?</span>
        <span>Question?</span>
      </div>
    </form>
  )
}
