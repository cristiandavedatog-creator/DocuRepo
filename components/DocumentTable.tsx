'use client'
import React, { useEffect, useState } from 'react'

type Doc = {
  id: string
  title: string
  googleDriveFileId: string
  mimeType: string
  size: number
  createdAt: string
  category: { name: string }
  uploadedBy: { name?: string }
}

export default function DocumentTable(){
  const [docs, setDocs] = useState<Doc[]>([])
  const [q, setQ] = useState('')

  useEffect(()=>{ fetch('/api/files').then(r=>r.json()).then(d=>setDocs(d)) }, [])

  const search = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/search?q='+encodeURIComponent(q))
    const data = await res.json()
    setDocs(data)
  }

  return (
    <div>
      <form onSubmit={search} className="flex gap-2">
        <input className="flex-1 border rounded px-3 py-2" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title, filename, category" />
        <button className="bg-primary text-white px-4 py-2 rounded">Search</button>
      </form>
      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th>Document Name</th>
              <th>Category</th>
              <th>Upload Date</th>
              <th>Size</th>
              <th>Uploaded By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map(d=> (
              <tr key={d.id} className="border-t">
                <td className="py-2">{d.title}</td>
                <td>{d.category?.name}</td>
                <td>{new Date(d.createdAt).toLocaleString()}</td>
                <td>{(d.size/1024).toFixed(1)} KB</td>
                <td>{d.uploadedBy?.name || '—'}</td>
                <td className="space-x-2">
                  <a className="text-blue-600" href={`/api/preview?id=${d.googleDriveFileId}`} target="_blank" rel="noreferrer">Preview</a>
                  <a className="text-green-600" href={`/api/download?id=${d.googleDriveFileId}`}>Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
