//@ts-nocheck   
import { emailRegex, passwordRegex } from "@/utils/regex"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
//Importo la función compare desde BCrypt
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function Post(req: Request, res: any){ 

    //Recuperar los datos ingresados, por parte de la peticion
    const usuario = req.body

    if(!usuario.password.match(passwordRegex)){
        return res.status(400).json({msg: "Error! contraseña inválido"}) 
    }

    //Verificar si la cuenta existe
    const usuarioEnDB = await prisma.usuario.findUnique({
        //Obtengo el usuario guardado en la DB

        //Le indico donde o en base a qué parametro va a buscar al usuario
        where: {
            username: usuario.username
            //Donde el email de la DB sea igual al recibido desde el cliente
        }
    })

    if(!usuarioEnDB){ //Si no hay un usuario en la DB que contenga el mail ingresado
        return res.status(403).json({msg: "No existe una cuenta asociada a ese mail!"})
        // 403:
    }

    //Validar Constraseña
    const contrasenaValida = await compare(
        usuario.password, 
        usuarioEnDB.password
    )

    if(!contrasenaValida)
    return res.status(401).json({msg: "Contraseña incorrecta"})
    //401 Unauthorized 

    const token = sign (usuarioEnDB, process.env.TOKEN_SECRET as string, {
        expiresIn: "7d" //Puedo indicar en cuanto tiempo expira el token
    })

    return res.status(201).json({token})

    
}