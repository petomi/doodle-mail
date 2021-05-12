import { io } from 'socket.io-client'

const URL = process.env.BASE_API_URL || 'http://localhost:5000'

const socket = io(URL, { autoConnect: false })

// TODO: remove after debug
socket.onAny((event, ...args) => {
  console.log(event, args)
})

socket.on('error', (err) => {
  console.log(err)
})

// TODO: have one notification handler than just creates alerts
// based on the message passed through?

export default socket
