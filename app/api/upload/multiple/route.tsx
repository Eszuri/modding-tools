import {NextRequest, NextResponse} from 'next/server'

export const POST = async (req: NextRequest) => {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
        return NextResponse.json({error: 'No file received'}, {status: 400})
    }
    await new Promise(res => setTimeout(res, 500))
    return NextResponse.json({message: 'Received'}, {status: 200})
}
