import { stripe } from "@/lib/stripe"
import { HomePage } from "./components/Homepage";
import Stripe from "stripe";
import { Metadata } from 'next'



export const revalidate = 7200 //2 hours

async function fetchProducts() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100) : "0",
    }
  })

  return products
}

export async function generateMetadata() : Promise<Metadata> {
  return {
    title: "Home | Ignite Shop",
  }

}

export default async function Home() {
  const products = await fetchProducts()

  return (
    <>

    <HomePage products={products} />
  </>
  )

}
