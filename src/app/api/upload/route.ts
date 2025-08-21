
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getSiteSettings } from '@/lib/actions';

async function configureCloudinary() {
    const settings = await getSiteSettings();
    const { cloudName, apiKey, apiSecret } = settings.integrations.cloudinary || {};

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error('Cloudinary configuration is missing in site settings.');
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });
}

export async function POST(request: Request) {
    try {
        await configureCloudinary();
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    try {
        const fileBuffer = await file.arrayBuffer();
        const mimeType = file.type;
        const encoding = 'base64';
        const base64Data = Buffer.from(fileBuffer).toString('base64');
        const fileUri = `data:${mimeType};${encoding},${base64Data}`;

        const result = await cloudinary.uploader.upload(fileUri, {
            folder: 'portfolio_uploads',
        });
        
        return NextResponse.json({ success: true, url: result.secure_url });

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}
