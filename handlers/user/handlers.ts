import { ServerWebSocket } from "bun"
import events from "../../constants/events";
import OnlineUsers from "../../store/onlineUsers.store";
import { WebSocketServerProps, login_payload, user_object_id } from "../../type";
import { sender } from "../../utils/socket.sender"

export function login(ws: ServerWebSocket<WebSocketServerProps>, data: login_payload) {
    try {
        console.log(`event: login`, data)

        OnlineUsers.insert({ userId: data.userId, token: data.token, connection: ws.data._id }, (user) => {
            ws.subscribe(user.userId)
            if (ws.isSubscribed(user.userId)) {
                console.log(`success: login`)
                return ws.send(sender(events.login, `Success login ${user.userId}`))
            } else {
                return ws.send(sender(events.error, "Error login"))
            }
        })

    } catch (error: any) {
        ws.send(sender(events.error, error.message))
    }
}

export function logout(ws: ServerWebSocket<WebSocketServerProps>, data: { id: string }) {
    try {
        console.log(`event: logout`, data)

        OnlineUsers.eject(ws.data._id, (user) => {
            ws.unsubscribe(user.userId)
            if (!ws.isSubscribed(user.userId)) {
                console.log(`success: logout`)
                return ws.send(sender(events.login, `Success logout ${user.userId}`))
            } else {
                return ws.send(sender(events.error, "Error logout"))
            }
        })

    } catch (error: any) {
        return ws.send(sender(events.error, error.message))
    }
}
