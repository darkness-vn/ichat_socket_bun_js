import { ServerWebSocket } from "bun"
import { WebSocketServerProps, send_message_payload, delete_message_payload, edit_message_payload, sending_message_payload } from "../../type"
import { sender, broadcast } from "../../utils/socket.sender"
import events from "../../constants/events"
import SendingUsers from "../../store/sendingUsers.store"

export function sendMessage(ws: ServerWebSocket<WebSocketServerProps>, data: send_message_payload) {
    try {
        console.log(`event: send_message`, data)

        if (data.userIds) {
            data.userIds.forEach(i => {
                ws.subscribe(i)
                ws.publish(i, sender("chat_notify", data.messageObject))
                ws.unsubscribe(i)
            })
        }

        if (!ws.isSubscribed(data.roomId)) {
            return ws.send(sender(events.error, "bạn chưa vào phòng này"))
        }

        broadcast(ws, { to: data.roomId, action: events.send_message, data: data.messageObject, self: true })
    } catch (error: any) {
        return ws.send(sender(events.error, error.message))
    }
}

export function deleteMessage(ws: ServerWebSocket<WebSocketServerProps>, data: delete_message_payload) {
    try {
        console.log(`event: delete_message`)

        if (!ws.isSubscribed(data.roomId)) {
            throw new Error("bạn chưa vào phòng này")
        }

        broadcast(ws, { to: data.roomId, action: events.delete_message, data: data.messageObject, self: true })
    } catch (error: any) {
        return ws.send(sender(events.error, error.message))
    }
}

export function editMessage(ws: ServerWebSocket<WebSocketServerProps>, data: edit_message_payload) {
    try {
        console.log(`event: edit_message`)

        if (!ws.isSubscribed(data.roomId)) {
            throw new Error("bạn chưa vào phòng này")
        }

        broadcast(ws, { to: data.roomId, action: events.edit_message, data: data.messageObject, self: true })
    } catch (error: any) {
        return ws.send(sender(events.error, error.message))
    }
}

export function sendingMessage(ws: ServerWebSocket<WebSocketServerProps>, data: sending_message_payload) {
    try {

        console.log(events.sending, data)

        if (!ws.isSubscribed(data.roomId)) {
            throw new Error("bạn chưa vào phòng này")
        }

        SendingUsers.insert({ userId: data.userId, roomId: data.roomId })
        const currentSendingUser = SendingUsers.list.filter(item => item.roomId === data.roomId)

        broadcast(ws, { to: data.roomId, action: events.sending, data: currentSendingUser, self: true })
    } catch (error: any) {
        return ws.send(sender(events.error, error.message))
    }
}

export function stopSendingMessage(ws: ServerWebSocket<WebSocketServerProps>, data: sending_message_payload) {
    try {
        if (!ws.isSubscribed(data.roomId)) {
            throw new Error("bạn chưa vào phòng này")
        }

        SendingUsers.remove({ userId: data.userId, roomId: data.roomId })
        const currentSendingUser = SendingUsers.list.filter(item => item.roomId === data.roomId)

        broadcast(ws, { to: data.roomId, action: events.stop_sending, data: currentSendingUser, self: true })
    } catch (error: any) {
        return ws.send(sender(events.error, error.message))
    }
}