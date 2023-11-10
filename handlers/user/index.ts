import { ServerWebSocket } from "bun"
import { WebSocketServerProps, user_object_id, login_payload } from "../../type"
import { login, logout } from "./handlers"
import events from "../../constants/events"

export default function userHandler(ws: ServerWebSocket<WebSocketServerProps>, action: string, data: Object) {
    switch (action) {
        case events.login:
            login(ws, data as login_payload)
            break

        case events.logout:
            logout(ws, data as { id: string })
            break
    }
}