"use client"

import Link from "next/link"
import Stripe from "stripe"
import Image from 'next/image'


export default function SuccessPage({ customerInfo, productInfo }: {customerInfo: string, productInfo: Stripe.Product}) {

  const imageUrl= productInfo.images[0]

  return (

  <main className="flex flex-col items-center justify-center mx-auto h-[656px]">
    <h1 className="text-2xl text-gray-100">Compra efetuada!</h1>

    <div className="img-productpage rounded-lg flex items-center justify-center w-full p-1 object-cover mt-16">
      <Image src={imageUrl} width={120} height={110} alt=""/>
    </div>

    <p className="text-xl text-gray-300 max-w-xl text-center mt-8 leading-[140%]">
      Uhuul <strong>{customerInfo}</strong>, sua <strong>{productInfo.name}</strong> já está a caminho da sua casa.
    </p>

    <Link href="/" className="no-underline font-bold mt-20 block text-lg text-green-500 hover:text-green-300 ">
      Voltar ao catálogo
    </Link>
  </main>
  )}
