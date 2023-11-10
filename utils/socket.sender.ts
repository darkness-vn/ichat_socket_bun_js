export const sender = (action: string, data: Object) => {
    return JSON.stringify({ action, data })
}

type broadcast_payload = {
    to: string,
    action: string,
    data: Object
    self: boolean
}

export const broadcast = (
    ws: any,
    { to, action, data, self }: broadcast_payload,
    callback?: () => void) => {

    ws.publish(to, sender(action, data))
    if (self) {
        ws.send(sender(action, data))
    }
    if (callback) { callback() }

}