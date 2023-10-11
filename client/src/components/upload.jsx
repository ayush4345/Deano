'use client'

import { useState } from 'react'

export function UploadForm() {
  const [files, setFiles] = useState()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!files.length) return
    try {
      const data = new FormData()
      console.log(files)
      data.set('files', files)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        multiple={true}
        name="file"
        onChange={(e) => setFiles(e.target.files)}
      />
      <input type="submit" value="Upload" />
    </form>
  )
}