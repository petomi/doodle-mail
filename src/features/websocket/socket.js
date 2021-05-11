import { io } from 'socket.io-client'

const URL = 'http://localhost:5000' // TODO - get this from .env
const socket = io(URL, { autoConnect: false })

// TODO: remove after debug
socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default socket
