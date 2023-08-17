import { useContext } from "react";
import { SocketContext } from "../stores/socket";

export const useSocket = () => useContext(SocketContext);
