import { randomUUID } from 'crypto';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { HttpClient } from '@/api/axios';

const shopId = process.env.NEXT_PUBLIC_YOUCASSA_SHOP_ID;
const secret_key = process.env.NEXT_PUBLIC_YOUCASSA_SECRET_KEY;
export async function POST(req: Request) {
    const body = await req.json();
    const data = {
        amount: {
            value: body.attributes.price,
            currency: 'RUB',
        },
        capture: true,
        confirmation: {
            type: 'redirect',
            return_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/profile`,
        },
        description: 'Оплата подписки',
        receipt: {
            customer: {
                email: body?.email,
            },
            items: [
                {
                    description: `Оплата подписки (${body.attributes.month} месяц${
                        body.attributes.month > 1 ? 'а' : ''
                    })`,
                    quantity: '1',
                    amount: {
                        value: body.attributes.price,
                        currency: 'RUB',
                    },
                    vat_code: '1',
                },
            ],
        },
    };
    const response = await axios.post('https://api.yookassa.ru/v3/payments', data, {
        headers: {
            'Content-Type': 'application/json',
            'Idempotence-Key': randomUUID(),
            Authorization: 'Basic ' + btoa(`${shopId}:${secret_key}`),
        },
    });
    const cookiesStore = cookies();
    const jwt = cookiesStore.get('jwt')?.value;
    const instance = HttpClient.updateAuthorizedPrerenderInstance(jwt);

    const order = await instance.post('/subscription/order', {
        data: {
            payment_id: response.data.id,
            tariff_id: String(body.id),
        },
    });
    return NextResponse.json(response.data, {
        status: 200,
    });
}
