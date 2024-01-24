import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data = await req.json();
    const resPinyin = await axios.post('http://127.0.0.1:8000/get_pinyin', { text: data.text });
    return NextResponse.json(resPinyin.data, {
        status: 200,
    });
}
