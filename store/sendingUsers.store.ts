import { sending_message_payload } from "../type";

export default class SendingUsers {
    static list: sending_message_payload[] = []

    /** @method insert : đưa người dùng vào trạng thái đang nhắn tin trong phòng X */
    static insert({ userId, roomId }: sending_message_payload) {
        const existed = this.list.find(item => item.roomId === roomId && item.userId === userId)
        if (!existed) {
            this.list.push({ userId, roomId })
        }
    }

    /** @method remove : đưa người dùng thoát khỏi trạng thái đang nhắn tin trong phòng X */
    static remove({ userId, roomId }: sending_message_payload) {
        const existed = this.list.find(item => item.roomId === roomId && item.userId === userId)
        if (existed) {
            this.list = this.list.filter(item => item.roomId !== roomId && item.userId !== userId)
        }
    }

    /** @method eject : đưa người dùng thoát khỏi trạng thái đang nhắn tin trong toàn bộ phòng */
    static eject({ userId }: { userId: string }) {
        this.list = this.list.filter(item => item.userId !== userId)
    }
}