import Chat from "@/components/Chat"
import { iniciarSockets } from "@/utils/iniciarSockets";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";


export default function Layout({children,}: {children: React.ReactNode})  {

    //let socket;

    //Controlar si el menú de categorías está visible o no.
    const [categoriasVisible, setCategoriasVisible] = useState(false); //oculto por defecto
    
    const [productos, setProductos] = useState([])
        
    // useEffect(() => {

    //     //Una vez que la página cargue, ejecuto la funcion que contiene los eventos
    //     socket = iniciarSockets({socket});
        
    //     return () => {
            
    //         // if(socket){
    //         //     socket.disconnect();
    //         // }
            
    //       //Cuando se descargue la página, corto la conexion con el servidor
    //     };
    // });

    //cambia el estado categoriasVisible a su opuesto cada vez que se llama. 
    const toggleCategorias = () => {
        setCategoriasVisible(!categoriasVisible);
    } ;

    async function obtenerProductos(){

        const response = await fetch ('https://fakestoreapi.com/products', {
            method: "GET",
            headers: {
                "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
            },
        })

        const productos = await response.json()

        setProductos(productos)

        return productos
    }

    return (
        
        <section className= " bg-fondoBarraBusqueda w-screen h-screen ">
            <nav className="bg-fondoHeader p-0.5 w-screen ">
                <ul className="flex w-screen text-white my-3 justify-between items-center">    

                    <div className="flex mx-10">

                        <li className="mx-5"><Link href="/">Inicio</Link></li>

                        <li className="mx-5" onClick={toggleCategorias}>
                            Categorias
                            {/* Flecha que indica si el menú está desplegado o no */}
                            {categoriasVisible ? '▲' : '▼'}
                        </li>

                        {/* Menú de categorías, si categoriasVisible es true: */}
                        {categoriasVisible && (
                            <div className="absolute flex flex-col bg-fondoHeader mt-2 py-2 px-4 rounded-md">
                                <Link href="/productos/electronics">Electrónicos</Link>
                                <Link href="/productos/jewelery">Joyería</Link>
                                <Link href="/productos/men's%20clothing">Hombre</Link>
                                <Link href="/productos/women's%20clothing">Mujer</Link>
                                {/* Agrega más categorías según tus necesidades */}
                            </div>
                        )}

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