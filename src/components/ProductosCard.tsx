import Link from "next/link"
import Image from "next/image";
import { useContext } from "react";
import {CarritoContext} from "@/context/CarritoContext"

type Product = {
  id: number
  title:string
  price:number
  category: string
  image: string
}

type ProductosCardProps = {
  id: number
  titulo:string
  precio:number
  categoria: string
  imagen: string
}   

export default function ProductosCard({id, titulo, precio, categoria, imagen}: ProductosCardProps){

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

      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
          <div className="h-64 relative">
            <Link href={`/productos/${categoria}/${id}`}>
              <Image
                src={imagen}
                alt="producto"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </Link>
          </div>
          <div className="mt-4">
            <Link href={`/productos/${categoria}/${id}`}>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {titulo}
              </h2>
            </Link>
              <p className="mt-1">${precio}</p>
          </div>

            <button className="bg-black" onClick={()=>{

              setCarrito({
                productos:[...carrito.productos, producto], 
                //Setteo el carrito con los productos que ya tenia carrito
                //Y dentro del valor productos tambien, todos los productos previos más el que se quiere agregar (a traves de su id)
              
                precioTotal:carrito.precioTotal + precio
                //Cambiamos el precio total sumandole al precio previo, el precio del producto agregado
              })

            }}>Agregar al carrito</button>
      </div>
  )
}