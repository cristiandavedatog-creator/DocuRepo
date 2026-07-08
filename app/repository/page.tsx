import React from 'react'
import DocumentTable from '../../components/DocumentTable'

export default async function Repository(){
  return (
    <main className="min-h-screen p-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-primary">Repository</h1>
        <div className="mt-4 card">
          <DocumentTable />
        </div>
      </div>
    </main>
  )
}
