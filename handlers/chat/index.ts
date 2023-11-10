import { ServerWebSocket } from "bun"
import { WebSocketServerProps, edit_message_payload, send_message_payload, sending_message_payload } from "../../type"
import { deleteMessage, editMessage, sendMessage, sendingMessage, stopSendingMessage } from "./handlers"
import events from "../../constants/events"

export default function chatHandler(ws: ServerWebSocket<WebSocketServerProps>, action: string, data: Object) {
    switch (action) {
        case events.send_message:
            sendMessage(ws, data as send_message_payload)
            break
        case events.edit_message:
            editMessage(ws, data as edit_message_payload)
            break
        case events.delete_message:
            deleteMessage(ws, data as edit_message_payload)
            break
        case events.sending:
            sendingMessage(ws, data as sending_message_payload)
            break
        case events.stop_sending:
            stopSendingMessage(ws, data as sending_message_payload)
            break


    }
}