import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    await request.formData();
    return NextResponse.json({message: 'Upload diterima.'});
}
