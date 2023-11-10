import type { user_object_id, online_user } from "../type"

export default class OnlineUsers {
    static list: Array<online_user> = []

    static insert(user: online_user, callback?: (user: online_user) => void) {

        // find existed online user
        const existed = this.list.find(u => u.userId === user.userId || u.connection === user.connection)
        if (existed) {
            console.log(`you have already logined`)
        } else {
            this.list.push(user)
        }

        if (callback) callback(user)
    }

    static eject(id: string, callback?: (user: online_user) => void) {
        const existed = this.list.find(u => u.connection !== id)

        if (existed) {
            this.list = this.list.filter(user => user.userId !== id)

            if (callback) { callback(existed) }
        }
    }
}