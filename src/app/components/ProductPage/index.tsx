"use client"

import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import Stripe from "stripe"


export default function ProductPage({ productInfo }: { productInfo: Stripe.Product }) {

  const price = productInfo.default_price as Stripe.Price

  const value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price.unit_amount ? price.unit_amount / 100 : 0)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {

    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.get('/api/checkout', {
        params: {
          priceId: price.id,
        }
      })

       const { checkoutUrl } = response.data;

       window.location.href = checkoutUrl
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry )
      alert('Falha ao redirecionar ao checkout!')
    }

  }

  return (
    <main className="grid grid-cols-[1fr_1fr] items-stretch gap-16 mx-auto max-w-6xl">
        <div className="w-full max-w-xl image-container rounded-lg p-1 flex items-center justify-center object-cover">
          <Image src={productInfo.images[0]} width={520} height={480} alt=""/>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl text-gray-300">{productInfo.name}</h1>
          <span className="mt-4 block text-2xl text-green-300">{value}</span>

          <p className="mt-10 text-md leading-6 text-gray-300">{productInfo.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct} className="btn-comprar mt-auto bg-green-500 border-0 text-white rounded-lg cursor-pointer p-5 font-bold text-md">Comprar agora</button>
        </div>
    </main>
  )}
