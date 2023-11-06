"use client"
import Link from "next/link"
import { FormEvent, useRef } from "react"
import {verify} from "jsonwebtoken"
//Importamos el contexto que creamos
import { useContext } from "react"
//Importamos la funcion de react que nos permite acceder a nuestro contexto


export default function FormularioDeRegistro(){
  //Inicio las referencias para mis inputs
  const nombreRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  //Creo la funcion para enviar los datos que me llegan del formulario al Backend
  async function mandarDatosDeRegistro(evento: FormEvent){ 
    //recibo el evento del formulario, de tipo FormEvent
    evento.preventDefault() //Prevengo el evento del formulario de recargar la pagina

    const usuario = {
      //@ts-ignore
      nombre: nombreRef.current?.value,
      //@ts-ignore
      email: emailRef.current?.value,
      //@ts-ignore
      password: passwordRef.current?.value
    }

    console.log(usuario)

    //Ejecuto una peticion de tipo POST para enviar los datos a la ruta del back que realiza el registro
    const respuesta = await fetch("http://localhost:3000/api/usuarios/register", {
      //Indico la ruta y configuracion de mi peticion
      method: "POST",
      headers: {
        //metadatos de la peticion que brindan un contexto 
        "Content-Type": "application/json", //Indico que vamos a enviar datos de tipo JSON
      },
      body: JSON.stringify(usuario), //Envio la conversion a JSON de los datos a enviar 
    })

    //Manejo los posibles errores de la peticion
    if(respuesta.status != 201){
      const error = await respuesta.json() //Capturamos el error, que indicamos previamente en el Back
      alert(error.msg) //Lo mostramos, accediendo al atributo msg del objeto donde recibimos el error
    }

    //Si todo sale bien, obtengo el TOKEN que recibo del Back
    const {token} = await respuesta.json()
    //El token es igual a esperar que la respuesta se transforme a JSON
    //Encierro el token en llaves para que me devuelva solamente el texto y no el objeto completo

    console.log(token)

    //Decodificar/decifrar el token para extraer sus datos y utilizarlos en la pagina
    //Obtenemos el usuario a traves del token

    const usuarioDecodificado = verify( //ejecutamos verify
      token as string, //pasandole el token a decodificar
      process.env.NEXT_PUBLIC_TOKEN_SECRET as string 
      //y la variable de entorno que corresponde al Front
    )
    console.log(usuarioDecodificado)
    
  }
  
  //HTML
  return(
    <>
      <form onSubmit={mandarDatosDeRegistro} className="text-black">
        {/*Le indico al form que, al momento de subirse, ejecute la funcion */}
      
        <input ref={nombreRef} type="text" placeholder="Nombre completo" />
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Contraseña"/>

        <input type="submit" value="Registrar" className="text-white"/>
      </form>

    </>    
  )
}