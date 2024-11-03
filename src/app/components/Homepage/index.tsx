"use client"

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'; // Importando os estilos do Keen Slider
import Image from "next/image";
import Link from "next/link"


interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export function HomePage({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });


  return (
   <main className="home-main flex w-full ml-auto keen-slider" ref={sliderRef}>
    {products.map(product => {
      return(
        <Link
        href={`/product/${product.id}`}
        prefetch={false}
        key={product.id}
        className="keen-slider__slide relative flex justify-center items-center rounded-lg group overflow-hidden">
          <Image src={product.imageUrl} alt="" width={520} height={480}
          className="object-cover" />
            <footer className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between bg-[rgba(0,0,0,0.6)] translate-y-[110%] opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                <strong className="text-lg text-gray-100">{product.name}</strong>
                <span className="text-xl font-bold text-green-300">{product.price}</span>
            </footer>
        </Link>
      )
    })}
   </main>
  );
}
