import { Injectable } from '@nestjs/common';

type Data = Record<string, { price: string }>

@Injectable()
export class FetchHttpAdapter {
    async call(from: string, to: string): Promise<Data> {
        const url = `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${from}&to=${to}`
        console.log(url)
        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
            return await res.json()
        } catch (err) {
            console.error(err)
            return new Promise<Data>((resolve, _) => {
                let data: Data = {}
                data[from] = { "price": "10000" }
                resolve(data)
            })
        }
    }
}