import io, { Socket } from "socket.io-client";

export async function iniciarSockets( {socket}: {socket: Socket }) {
    await fetch("/api/socket");
    //Inicio la ruta, para conectarme al servidor

    //importamos io desde socket y la guardamos en la variable let socket
    socket = io();

    return socket;

}