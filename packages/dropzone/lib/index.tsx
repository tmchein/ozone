'use client'

import React, { type ChangeEvent, type FormEvent, useRef, useState } from 'react'
import { type DropzoneProps } from './types'

const Dropzone = ({
  dropzoneTitle = 'Upload your file',
  uploadButtonText = 'Upload',
  uploadApiRoute,
  afterProcessed,
  acceptFileExtension
}: DropzoneProps) => {
  const [fileName, setFileName] = useState('')
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    hiddenFileInput.current?.click()
  }

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file == null) {
      return
    }

    setFileName(file?.name)
    const formData = new FormData()
    formData.append('File', file)
    const parsedFileResponse = await fetch(uploadApiRoute, {
      method: 'POST',
      body: formData
    })
    const parsedFile: string = await parsedFileResponse.json()

    afterProcessed(parsedFile)
  }

  return (
    <form
      className="flex flex-col items-center justify-center border-2
      border-dashed gap-6 p-4"
      onSubmit={handleSubmit}
    >
      <label htmlFor="UploadFileBtn" className="text-xl font-semibold">
        {dropzoneTitle}
      </label>
      <button
        id="UploadFileBtn"
        className="bg-black px-4 py-2 text-white rounded-md"
        type="submit"
      >
        {uploadButtonText}
      </button>
      <input
        className="hidden"
        type="file"
        ref={hiddenFileInput}
        onChange={handleUpload}
        accept={acceptFileExtension}
      />
      {Boolean(fileName) && <small>{fileName}</small>}
    </form>
  )
}

export default Dropzone
