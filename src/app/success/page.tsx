import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import SuccessPage from "../components/SuccessPage";
import { redirect } from "next/navigation";
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {

  return {
    title: `Compra efetuada | Ignite Shop`,
  }
}


export default async function Success({searchParams} : {searchParams : { session_id : string}}) {

  if (!searchParams.session_id) {
      redirect('/')
  }

  const sessionId = searchParams.session_id

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name ?? 'Nome não disponível';

  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return (
   <SuccessPage productInfo={product} customerInfo={customerName} />
  )
}
