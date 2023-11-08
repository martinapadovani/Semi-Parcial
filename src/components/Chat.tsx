import { useState, useEffect, FormEvent } from "react";
import io, { Socket } from "socket.io-client";

export default function ChatPage({socket}: {socket: Socket }) {

    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [todosLosMensajes, setTodosLosMensajes] = useState([]);
    
    // useEffect(() => {
    //     //Una vez que la página cargue, ejecuto la funcion que contiene los eventos
    //     iniciarSockets();
        
    //     return () => {
    //         if (socket) {
    //             socket.disconnect();
    //         }
    //       //Cuando se descargue la página, corto la conexion con el servidor
    //     };
    // }, []);

    if (socket){

        socket.on("chat:mensaje", (mensajeNuevo) => {
            //recibo el mensaje y lo agrego a la lista de mensajes
            //no puedo usar .push ya que es un estado
     
            //recibe los mensajes que estaban guardados en el arreglo hasta el momento
            //@ts-ignore
            setTodosLosMensajes((mensajesAnteriores) => 
              [...mensajesAnteriores, mensajeNuevo,]);
              //seteo el arreglo con la clonacion de los mensajes anteriores más el nuevo
         });

    }


    function enviarMensaje(evento: FormEvent) {
        evento.preventDefault();
        
        socket.emit("chat:mensaje", { username, contenido: message });
        //emito el mensaje escrito
        console.log("Mensaje enviado!");
        
        setMessage(""); //vaciamos el mensaje uan vez enviado
    }

  return (
        <form onSubmit={enviarMensaje} action="" className="text-black">
            {/*Cuando se envie el mensaje (submit) se ejecuta la funcion */}

            <input onChange={(evento) => setUsername(evento.target.value)}         
                /*Cuando cambie el contenido del input, recibe el evento (el cambio del contenido) 
                y lo seteamos su valor (el contenido) como nuevo username */
                type="text" name="" id="" placeholder="Username"
            />

            {/*Mostrar todos los mensajes en una lista */}
            <ul className="text-white">
                {/*Tengo que transformar los mensajes en HTML */}
                {todosLosMensajes.map((mensaje, index) => (

                    <li key={index}> {/*por cada mensaje dentro del arreglo creo un li */}

                        {mensaje.username}: {mensaje.contenido}
                    </li>
                ))}
            </ul>

            <input onChange={(evento) => setMessage(evento.target.value)}
                /*Cuando cambie el contenido del input, recibe el evento (el cambio del contenido) 
                y lo seteamos su valor (el contenido) como mensaje */
                value={message} type="text" name="" id="" placeholder="Mensaje"
            />

          <input type="submit" className="text-white" value="Enviar mensaje" />
        </form>
    );

}