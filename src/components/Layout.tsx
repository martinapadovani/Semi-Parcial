import Chat from "@/components/Chat"
import { iniciarSockets } from "@/utils/iniciarSockets";
import Link from "next/link";
import { useEffect } from "react";
import { Socket } from "socket.io-client";


export default function Layout({children,}: {children: React.ReactNode})  {

    let socket;
        
    useEffect(() => {

        //Una vez que la página cargue, ejecuto la funcion que contiene los eventos
        socket = iniciarSockets({socket});
        
        return () => {
            
            // if(socket){
            //     socket.disconnect();
            // }
            
          //Cuando se descargue la página, corto la conexion con el servidor
        };
    });


    return (
        
        <section className= " bg-fondoBarraBusqueda w-screen h-screen ">
            <nav className="bg-fondoHeader p-0.5 w-screen ">
                <ul className="flex w-screen text-white my-3 justify-between items-center">    

                    <div className="flex mx-10">
                        <li className="mx-5"><Link href="/">Inicio</Link></li>
                        <li className="mx-5" ><Link href="/" >Categorias</Link></li>
                    </div>

                    <input className="rounded-sm w-3/5 bg-fondoBarraBusqueda    p-1"/>

                    <div className="flex mx-10">
                        <li className="mx-5" ><Link href="/auth/login" >Ingresá</Link></li>
                        <li className="mx-5" ><Link href="/auth/register" >Registrate</Link></li>
                        <li className="mx-5" ><Link href="/" >Contacto</Link></li>
                    </div>

                </ul>
            </nav>

            {children}
            
            {/* <h2>Chat de soporte: </h2>
            <Chat socket={socket} ></Chat> */}
        </section>

    )
}