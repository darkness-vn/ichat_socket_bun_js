import { ServerWebSocket } from "bun"
import { WebSocketServerProps, join_room_payload, invite_payload } from "../../type"
import { joinRoom, invite } from "./handlers"
import events from "../../constants/events"

export default function roomHandler(ws: ServerWebSocket<WebSocketServerProps>, action: string, data: Object) {
    switch (action) {
        case events.join_room:
            joinRoom(ws, data as join_room_payload)
            break
        case events.invite:
            invite(ws, data as invite_payload)  
            break
    }
}