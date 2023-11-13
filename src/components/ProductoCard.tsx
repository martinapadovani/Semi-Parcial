import Image from "next/image";
import { type } from "os";

type ProductoCardProps = {
  titulo:string
  precio:number
  descripcion: string
  imagen: string
}

export default function Producto({titulo, precio, descripcion, imagen}: ProductoCardProps){
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