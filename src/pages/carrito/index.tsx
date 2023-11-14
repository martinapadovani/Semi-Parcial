import { useContext } from "react";
import {CarritoContext} from "@/context/CarritoContext"
import ProductoCarrito from "@/components/ProductoCarrito";


type Product = {
  id: number
  title:string
  price:number
  category: string
  image: string
}

export default function Page(){

  //@ts-ignore
  const {carrito} = useContext(CarritoContext)

  return (

    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Mi carrito</h1>
            <button onClick={() => console.log(carrito)}>ver carrito</button>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">

              {carrito.productos.map((producto: Product, index: any) => (
                <ProductoCarrito
                key={index}
                id = {producto.id}
                titulo = {producto.title}
                precio = {producto.price}
                categoria = {producto.category} 
                imagen = {producto.image} 
                />
              ))}

            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>{carrito.precioTotal}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}