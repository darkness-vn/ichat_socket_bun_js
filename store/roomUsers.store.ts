import type { room_object_id, user_object_id } from "../type"

export type roomUsers = Array<{ userId: user_object_id, connection: string }>

export default class RoomUsers {

    static list: {[roomId: string]: roomUsers} = {}

    static insert(data: { roomId: room_object_id, userId: user_object_id, connection: string }, callback?: ()=>void) {
        if (!this.list[data.roomId]) {
            this.list[data.roomId] = [{ userId: data.userId, connection: data.connection }]
        } else {
            const existedUser = this.list[data.roomId].find(user => user.userId === data.userId)
            if (!existedUser) {
                console.log(`Người dùng ${data.userId} đã vào phòng ${data.roomId}`)
                this.list[data.roomId].push({ userId: data.userId, connection: data.connection })
            } else {
                throw new Error (`Người dùng ${data.userId} đã tồn tại trong phòng ${data.roomId}`)
            }
        }
    }
}