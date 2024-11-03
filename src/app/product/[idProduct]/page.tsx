import { stripe } from "@/lib/stripe"
import ProductPage from "@/app/components/ProductPage"
import { Metadata } from "next"


export async function generateMetadata({params: { idProduct }}: { params: { idProduct: string } }) : Promise<Metadata> {
  const productId = idProduct

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  return {
    title: `${product.name} | Ignite Shop`,
  }
}

export const revalidate = 3600 // 1 hora

export default async function Product({ params: { idProduct } }: { params: { idProduct: string } }) {

  const productId = idProduct

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const plainProduct = JSON.parse(JSON.stringify(product))

  return (
    <ProductPage productInfo={plainProduct} />
  )
}
