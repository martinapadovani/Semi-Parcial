import { useContext } from "react";
import {CarritoContext} from "@/context/CarritoContext"
import Image from "next/image"

type ProductoCarritoProps = {
    id: number
    titulo:string
    precio:number
    categoria: string
    imagen: string
}

type Product = {
    id: number
    title:string
    price:number
    category: string
    image: string
}

export default function Carrito({id, titulo, precio, categoria, imagen} : ProductoCarritoProps){

    //@ts-ignore
    const {carrito, setCarrito} = useContext(CarritoContext)

    const producto: Product = {
        id: id,
        title:titulo,
        price:precio,
        category: categoria,
        image: imagen
    }    

    return (
        <li className="flex items-center gap-4">

        <Image
          src={producto.image}
          alt=""
          width={1000}
          height={1000}
          className="h-16 w-16 rounded object-cover"
        />

        <div>
          <h3 className="text-sm text-gray-900">{producto.title}</h3>

          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div>
              <dt className="inline">Categoria: </dt>
              <dd className="inline">{producto.category}</dd>
            </div>
            <div>
              <dt className="inline">Precio: </dt>
              <dd className="inline">{producto.price}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {/* <form>
            <label for="Line1Qty" className="sr-only"> Quantity </label>

            <input
              type="number"
              min="1"
              value="1"
              id="Line1Qty"
              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
          </form> */}

            <button onClick={()=>{

                const productosFiltrados = carrito.productos.filter((productoActual:Product) =>{
                    return productoActual.id !== producto.id
                })

                const precioFiltrado = carrito.precioTotal - producto.price
                
              setCarrito({
                productos: productosFiltrados, 

                precioTotal: precioFiltrado
              })

            }} className="text-gray-600 transition hover:text-red-600">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </li>
    )
}