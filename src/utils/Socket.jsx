// Socket.js
import io from "socket.io-client";
import { host } from "./APIRoutes";
// const Socket = io.connect(`${host}`);
const Socket = host;
export default Socket;