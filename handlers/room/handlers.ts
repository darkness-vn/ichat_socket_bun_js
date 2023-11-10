import { ServerWebSocket } from "bun"
import { join_room_payload, invite_payload, leave_payload, WebSocketServerProps } from "../../type"
import { sender, broadcast } from "../../utils/socket.sender"
import events from "../../constants/events"

export function joinRoom(ws: ServerWebSocket<WebSocketServerProps>, data: join_room_payload) {
    try {
        ws.subscribe(data.roomId)

        broadcast(ws, { to: data.roomId, action: events.join_room, data: `user ${data.userId} has just joined room`, self: true }, () => {
            console.log(`joined!!!`)
        })
    } catch (error: any) {
        return ws.send(sender(events.error, error.message))
    }
}

export function invite(ws: ServerWebSocket<WebSocketServerProps>, data: invite_payload) {
    try {
        console.log(`event invite`, data)
        ws.subscribe(data.userId)
        broadcast(ws, { to: data.userId, action: "inivte", data: data.roomObject, self: false }, () => {
            ws.unsubscribe(data.userId)
        })
    } catch (error: any) {
        console.log(error)
        return ws.send(sender(events.error, error.message))
    }
}

export function leave(ws: ServerWebSocket<WebSocketServerProps>, data: leave_payload) {
    try {
        console.log(`event: leave`, data)
        // un sub

        broadcast(ws, { to: data.roomId, action: events.leave_room, data: data.roomId, self: true }, () => {
            ws.unsubscribe(data.roomId)
        })

    } catch (error: any) {
        console.log(error)
        return ws.send(sender(events.error, error.message))
    }
}