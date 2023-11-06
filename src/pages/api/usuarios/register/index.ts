//@ts-nocheck
import { emailRegex, passwordRegex } from "@/utils/regex"
import { encriptarPassword } from "@/utils/encriptar"
import { sign } from "jsonwebtoken"
//importo la funcion sign

import { PrismaClient} from "@prisma/client"
//Importamos PrismaClient para crear una conexion con la DB, desde el codigo
const prisma = new PrismaClient() 

//Ruta de tipo POST para poder subir usuarios
export default async function post(req: Request, res: any) {
    //recibe una request (peticion), de tipo Resquest

    //Capturar los datos del usuario por parte de la peticion
    const usuario = req.body
    //Guardo en un objeto usuario, los datos en formato JSON

    console.log(usuario)//chequeo que los datos me llegan bien

    //Chequeo que se esten completando todos los datos
    if(Object.values(usuario).includes(undefined)){
        //Desde la clase Object obtengo un arreglo con los valores correspondientes al objeto usuario
        //Si alguno de los valores incluye undefined (no se definio el campo)

        //Devuelvo 400 Bad Request, ya que es una mala peticion

        return res.status(400).json({msg: "Error! Faltan datos"})
        //Devuelvo el error como un objeto con el atributo msg, transformado a json
    }

    //VALIDO LOS DATOS, que coincidan con su formato
    if(!usuario.email.match(emailRegex)) {
        //si el email ingresado no coincide con el REGEX
        return res.status(400).json({msg: "Error! email inválido"})
    }

    if(!usuario.password.match(passwordRegex)){
        return res.status(400).json({msg: "Error! contraseña inválida"})
    }

    //Encripto mi contraseña
    const hashedPassword = await encriptarPassword(usuario.password)

    const usuarioAGuardar = {...usuario, password: hashedPassword} 
    // Creo una variables que va a ser igual a un objeto
    // El objeto la clonacion del usuario recibido, pero modificando su contraseña por la Hasheada
    //De esta forma mi DB contiene datos seguros

    //Guardo el usuario en la DB
    const usuarioSubido = await prisma.usuario.create({data: usuarioAGuardar})

    //Confirmo que se haya subido
    if (!usuarioSubido) return res.status(500).json({msg: "No se pudo subir el usuario"})
    //Devuelvo un 500 Internal Server Error

    //Guardo un token que es igual a que se firmen los datos del usuarios con el secreto indicado
    const token = sign(usuarioAGuardar, process.env.TOKEN_SECRET as string)
    /*sing recibe 2 parametros:
     - Los datos que queremos encriptar
     - El Secreto (llave privada), que esta guardada dentro de una variable de entorno
     y le indico que es de tipo string 
    */ 

    return res.status(201).json({token})
    //Devuelvo el token, convertido a json

    // const respuesta = {... usuarioAGuardar, token}
    // /*En la respuesta que va a devolver la solicitud, y va a recibir el front, guardo:
    //  La clonacion de los datos usuario
    //  El token 
    // */
    
    
}