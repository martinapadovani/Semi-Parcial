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

type ProductoCardProps = {
  id: number
  titulo:string
  precio:number
  descripcion: string
  categoria: string
  imagen: string
}

export default function Producto({id, titulo, precio, descripcion, imagen, categoria}: ProductoCardProps){

  //@ts-ignore
  const {carrito, setCarrito} = useContext(CarritoContext)

  const producto: Product = {
    id: id,
    title:titulo,
    price:precio,
    category: categoria,
    image: imagen
  }

  return(

      <section>
          <Image
          src={imagen}
          alt=""
          width={1000}
          height={1000}
          className="h-64 sm:h-[450px]"
        />
      
        <div className="mt-3 flex justify-between text-sm">
          <div>
            <h3
              className="text-gray-900 group-hover:underline group-hover:underline-offset-4"
            >
              {titulo}
            </h3>
          
            <p className="mt-1.5 max-w-[45ch] text-xs text-gray-500">{descripcion}</p>
            <p className="text-gray-900">{precio}</p>

            <button className="bg-black" onClick={()=>{

              setCarrito({
                productos:[...carrito.productos, producto], 
                //Setteo el carrito con los productos que ya tenia carrito
                //Y dentro del valor productos tambien, todos los productos previos más el que se quiere agregar (a traves de su id)

                precioTotal:carrito.precioTotal + precio
                //Cambiamos el precio total sumandole al precio previo, el precio del producto agregado
              })

              console.log(carrito)
            }}>Agregar al carrito</button>
            
          </div>

        </div>

      </section>



      // <section classNameName="text-black">
      //     <h2>{titulo}</h2>
      //     <p>{descripcion}</p>
      //     <p>{precio}</p>
      //     {/* <Image
      //         src={imagen}
      //         alt="producto"
      //         layout="fill"
      //         objectFit="cover"
      //         className="rounded-lg w-10 h-10"
      //     /> */}
      // </section>
  )
}