import Link from "next/link"
import Image from "next/image";

/*La interfaz CategoriaCardProps en TypeScript define la estructura y tipos de las propiedades que espera el componente CategoriaCard. 
En este caso defino  que espera una propiedad llamada categoria de tipo string*/
interface CategoriaCardProps {
  categoria: string;
  imagen: string
}

export default function CategoriaCards({categoria, imagen}:CategoriaCardProps){

    return(

      <div className="p-6  bg-fondoBarraBusqueda">

        <h2 className="mb-8 text-xs font-semibold tracking-widest text-fondoHeader  uppercase">{categoria}</h2>

        <Image src={imagen} alt={`Imagen de ${categoria}`}  width={400} height={400}  className="object-cover object-center mb-8 lg:h-48 md:h-36 rounded-xl" ></Image>

        <div className="mt-4">
          <Link className="inline-flex items-center mt-4 font-semibold text-fondoHeader  lg:mb-0 hover:text-neutral-800" href={`/productos/${categoria}`} >Ver productos</Link>
        </div>
      </div>

    )
}