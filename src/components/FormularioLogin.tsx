"use client"
import { UserContext } from "@/context/UserContext"
import Link from "next/link"
import { FormEvent, useContext, useRef } from "react"
import Swal from "sweetalert2"
import Chat from "./Chat"


export default function FormularioLogin(){
    //Referencias de los campos de entrada
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    //Contexto de usuario
    //@ts-ignore
    const {user, setUser} = useContext(UserContext)

    //Funcion para enviar los datos que me llegan desde el formulario, al Backend
    async function mandarDatosDeLogin(evento: FormEvent){ 
    //recibo el evento del formulario, de tipo FormEvent

      evento.preventDefault() //Prevengo el evento del formulario de recargar la pagina

      // Construyo   el objeto de usuario con los datos del formulario
      const usuario = {
        //@ts-ignore
        username: usernameRef.current?.value,
        //@ts-ignore
        password: passwordRef.current?.value
      }

      console.log(usuario)

      //Ejecuto una peticion de tipo POST para enviar los datos a la ruta del back que realiza el inicio de sesion
      const respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
        //Indico la ruta y configuracion de mi peticion
        method: "POST",
        headers: {
          //metadatos de la peticion que brindan un contexto 
          "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
        },
        body: JSON.stringify(usuario), //Envio la conversion a JSON de los datos a enviar 
      })

      //Manejo los posibles errores de la peticion
      if(respuesta.status == 400){
          const error = await respuesta.json() //Capturamos el error, que indicamos previamente en el Back      
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   `${error.msg}`
          })
      }

      if(respuesta.status == 403){ //reenviarlo para registrarse
          const error = await respuesta.json()
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:   `${error.msg}`,
              footer: '<a href="/auth/registrarse">Registrarse</a>'
            })
      }

      if(respuesta.status == 401){
        const error = await respuesta.json() //Capturamos el error, que indicamos previamente en el Back
       console.log()
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:   `${error.msg}`,
          footer: '<a href="/auth/recuperar">Has olvidado tu contraseña?</a>'
        })
      }

      if(respuesta.status == 201){
    
        Swal.fire({
          icon: 'success',
         title: 'Inicio de sesion exitoso',
         footer: '<a href="/auth/blogs">Ir Blogs</a>'
        })

        //Actualizo el contexto del usuario
        setUser({
          ...user,
          //@ts-ignore
          username: usernameRef.current?.value,
          autorizado: true
        })
        console.log(user)
      }

      // //Si todo sale bien, obtengo el TOKEN que recibo del Back, contiene al usuario y la firma
      // const token = await respuesta.json()
      // //El token es igual a esperar que la respuesta se transforme a JSON
      // //Encierro el token en llaves para que me devuelva solamente el texto y no el objeto completo

      // // console.log(token)
    }

  return user.autorizado ? (

      <>
        <h2 className="text-black">Bienvenido!</h2>
        <h2>Chat de soporte: </h2>
        <Chat></Chat>
      </>
      
      ):
      (
        <form onSubmit={mandarDatosDeLogin} className="h-2/5 w-80 bg-fondoMain mx-auto mt-20 rounded-lg flex flex-col justify-evenly m-auto p-4 text-black" action="">

          <input className= "mx-5 rounded-lg p-2"  ref={usernameRef} type="text" placeholder="Usuario"/>
          <input  className= "mx-5 rounded-lg p-2" ref={passwordRef} type="password" placeholder="Contraseña" />

          <input type="submit" value="Ingresar" className="text-white"/>

          <Link className="mx-auto" href="/auth/login">Todavia no tienes cuenta? Registrate!</Link>
        </form>
      )
    
  

}