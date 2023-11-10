import { ServerWebSocket } from "bun"
import events from "./constants/events"
import userHandler from "./handlers/user"
import { broadcast, sender } from "./utils/socket.sender.ts";
import { WebSocketServerProps } from "./type";
import OnlineUsers from "./store/onlineUsers.store.ts";
import roomHandler from "./handlers/room/index.ts";
import chatHandler from "./handlers/chat/index.ts";
import SendingUsers from "./store/sendingUsers.store.ts";



const server = Bun.serve<WebSocketServerProps>({
    port: 4000,

    fetch: (req, server) => {
        const _id = crypto.randomUUID();
        server.upgrade(req, {
            data: {
                _id: _id,
            },
        });
        return new Response("Upgrade Failed", { status: 500 });
    },
    websocket: {
        message(ws, message) {
            const { action, data } = JSON.parse(String(message))

            userHandler(ws, action, data)
            roomHandler(ws, action, data)
            chatHandler(ws, action, data)
            
        },
        open(ws) {
            console.log("some one connected", ws.data._id)
        },
        close(ws, code, message) {
            OnlineUsers.eject(ws.data._id, (user) => {
                if (!ws.isSubscribed(user.userId)) {
                    SendingUsers.eject({ userId: user.userId })
                    console.log(`success: logout`)
                } else {
                    console.log(`error: logout`)
                }
            })
        },
        drain(ws) {
            console.log(`asdasd`)
        },
    },
});

console.log(`Listening on ${server.hostname}:${server.port}`)