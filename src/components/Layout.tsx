import { buscarProductos } from "@/utils/logicaInputBusqueda";
import Link from "next/link";
import {useRef, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation";
import { ProductosContext } from "@/context/ProductosContext";


export default function Layout({children,}: {children: React.ReactNode})  {

    //@ts-ignore
    const {filtrarProductos} = useContext(ProductosContext) 

    const router = useRouter()
    //Controlar si el menú de categorías está visible o no.
    const [categoriasVisible, setCategoriasVisible] = useState(false); //oculto por defecto

    const inputBusquedaRef = useRef(null)
        
    //cambia el estado categoriasVisible a su opuesto cada vez que se llama. 
    const toggleCategorias = () => {
        setCategoriasVisible(!categoriasVisible);
    } ;

    //Se ejecutará cada vez que se presione una tecla dentro del input. 
    const teclaPresionada = (event: any) => {

        //@ts-ignore
        const busqueda = inputBusquedaRef.current.value.toLowerCase()
        console.log(busqueda)

        //Si la tecla presionada es "Enter", se llama a buscarProductos().
        if (event.key === 'Enter') {
            router.push("/productos")
          // La tecla "Enter" fue presionada, ejecutar la función
          filtrarProductos(busqueda);
        }
    };

        //@ts-ignore
        const {user} = useContext(UserContext)

        //console.log(user.autorizado)

    return user.autorizado ? (

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

                    <input onKeyDown={teclaPresionada} ref={inputBusquedaRef} className="rounded-sm w-3/5 bg-fondoBarraBusqueda  text-black  p-1"/>

                    <div className="flex mx-10">
                        <li className="mx-5" ><Link href="/auth/login" >{user.username}</Link></li>
                        <li className="mx-5" ><Link href="/auth/logout" >Cerrar sesion</Link></li>
                        <li className="mx-5" ><Link href="/carrito" >Carrito</Link></li>
                    </div>

                </ul>
            </nav>

            {children}


        </section>

    ):
    
    (
        
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

                    <input onKeyDown={teclaPresionada} ref={inputBusquedaRef} className="rounded-sm w-3/5 bg-fondoBarraBusqueda  text-black  p-1"/>

                    <div className="flex mx-10">
                        <li className="mx-5" ><Link href="/auth/login" >Ingresá</Link></li>
                        <li className="mx-5" ><Link href="/auth/register" >Registrate</Link></li>
                        <li className="mx-5" ><Link href="/carrito" >Carrito</Link></li>
                    </div>

                </ul>
            </nav>

            {children}


        </section>

    )
}