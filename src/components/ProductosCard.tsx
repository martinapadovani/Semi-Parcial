import Link from "next/link"
import Image from "next/image";

type ProductosCardProps = {
  id: number
  titulo:string
  precio:number
  categoria: string
  imagen: string
}   

export default function ProductosCard({id, titulo, precio, categoria, imagen}: ProductosCardProps){

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
        </div>
    )
}