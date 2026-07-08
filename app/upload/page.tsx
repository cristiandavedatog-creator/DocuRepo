'use client'
import React, { useState } from 'react'

export default function UploadPage(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('1')
  const [file, setFile] = useState<File | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) { alert('Select a file'); return }
    if (file.size > 25 * 1024 * 1024) { alert('Max 25 MB'); return }
    const fd = new FormData()
    fd.append('title', title)
    fd.append('description', description)
    fd.append('category', category)
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (res.ok) alert('Uploaded')
    else alert(data?.error || 'Upload failed')
  }

  return (
    <main className="min-h-screen p-6 bg-background">
      <div className="max-w-2xl mx-auto card">
        <h1 className="text-xl font-semibold text-primary">Upload Document</h1>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="border rounded px-3 py-2" />
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="border rounded px-3 py-2" />
          <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded px-3 py-2">
            <option value="1">Memorandum</option>
            <option value="2">Administrative</option>
            <option value="3">Finance</option>
            <option value="4">Human Resources</option>
            <option value="5">Forms</option>
            <option value="6">Archive</option>
          </select>
          <input type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} accept=".pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
          <button className="bg-primary text-white px-4 py-2 rounded mt-2" type="submit">Upload</button>
        </form>
      </div>
    </main>
  )
}
