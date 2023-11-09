import Link from "next/link"
import Image from "next/image";

interface ProductosCardProps {
    titulo:string
    precio:number
    descripcion: string;
    imagen: string
}



export default function ProductosCard({titulo, precio, descripcion, imagen}: ProductosCardProps){

    return (

        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <div className="h-64 relative">
                <Image
                  src={imagen}
                  alt="producto"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
            </div>
            <div className="mt-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {titulo}
                </h2>

                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {descripcion}
                </h3>
                
                <p className="mt-1">${precio}</p>
            </div>
        </div>
    )
}