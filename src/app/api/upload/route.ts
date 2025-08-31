
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';

// Creates a 16-character unique ID
const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  16
);

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json(
      { message: 'Missing filename or body' },
      { status: 400 },
    );
  }

  // The filename is coming from the client, so we need to sanitize it
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const uniqueFilename = `${nanoid()}-${sanitizedFilename}`;

  // The `put` function returns a `BlobResult` object
  // which includes the URL of the uploaded blob.
  const blob = await put(uniqueFilename, request.body, {
    access: 'public',
  });

  return NextResponse.json({ success: true, url: blob.url });
}
