import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // Validate files
    const allowedTypes = [
      'image/jpeg', 
      'image/png', 
      'image/webp', 
      'image/svg+xml', 
      'image/avif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4',
      'video/webm'
    ]
    
    const maxSize = 50 * 1024 * 1024 // 50MB for high-res images and videos
    
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ 
          error: `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}` 
        }, { status: 400 })
      }

      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: `File "${file.name}" is too large. Maximum size: ${maxSize / (1024 * 1024)}MB` 
        }, { status: 400 })
      }
    }

    // Create FormData for Strapi
    const strapiFormData = new FormData()
    files.forEach(file => {
      strapiFormData.append('files', file)
    })

    // Add metadata if provided
    const folder = formData.get('folder') as string
    const ref = formData.get('ref') as string
    const refId = formData.get('refId') as string
    const field = formData.get('field') as string

    if (folder) strapiFormData.append('folder', folder)
    if (ref) strapiFormData.append('ref', ref)
    if (refId) strapiFormData.append('refId', refId)
    if (field) strapiFormData.append('field', field)

    // Upload to Strapi
    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
      body: strapiFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Upload failed: ${response.statusText} - ${errorText}`)
    }

    const result = await response.json()
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get('id')

    if (!fileId) {
      return NextResponse.json({ error: 'File ID required' }, { status: 400 })
    }

    // Delete from Strapi
    const response = await fetch(`${STRAPI_URL}/api/upload/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
      },
    })

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    )
  }
}