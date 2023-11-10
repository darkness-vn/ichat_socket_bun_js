export type WebSocketServerProps = {
    _id: string;
};

interface iRoom {
    _id: room_object_id,
    roomName: string
    roomType: number
    roomIcon: string
}

interface iMessage {
    _id: message_object_id,
    message: string,
}

export type user_object_id = string
export type room_object_id = string
export type message_object_id = string 
export type online_user = { userId: user_object_id, connection: string, token: string }
export type login_payload = { userId: user_object_id, token: string }
export type join_room_payload = { userId: user_object_id, roomId: room_object_id }
export type leave_payload = { userId: user_object_id, roomId: room_object_id }
export type invite_payload = { userId: user_object_id, roomObject: iRoom }
export type send_message_payload = { roomId: room_object_id, messageObject: iMessage, userIds?: user_object_id[] }
export type delete_message_payload = { roomId: room_object_id, messageObject: iMessage }
export type edit_message_payload = { roomId: room_object_id, messageObject: iMessage }
export type sending_message_payload = { roomId: room_object_id, userId: user_object_id }