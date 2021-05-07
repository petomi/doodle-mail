import React, { Component } from "react"
import { connect } from 'react-redux'
import { Button, Stack, Text } from '@chakra-ui/react'
import { sendMessageToRoom } from '../rooms/roomSlice'
import { success, error } from '../alerts/alertSlice'
import CanvasDraw from "react-canvas-draw";
import { withRouter } from "react-router-dom";


class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      title: 'a',
      imageData: '',
      background: 'a'
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    // get image data from canvas
    const canvasData = this.canvas.getSaveData()
    this.setState(prevState => ({
      ...prevState.title,
      ...prevState.background,
      imageData: canvasData,
    }))
    // send message to room
    const message = {
      title: this.state.title,
      imageData: this.state.imageData,
      background: this.state.background
    }
    const sendMessageObject = {
      roomId: this.props.roomData._id,
      userName: this.props.userName,
      messages: [message]
    }
    this.props.sendMessageToRoom(sendMessageObject).then((data) => {
      if (data.type === "room/sendMessage/fulfilled") {
        this.props.success(`Message sent to room: ${this.props.roomData.entryCode}`)
        this.props.history.push('/room')
      } else {
        this.props.error(`Failed to send message!`)
        this.setState({
          title: '',
          imageData: '',
          background: ''
        })
      }
    })
  }

  render() {
    if (this.props.roomCode != null) {
      return (

        <Stack spacing={16}>
          {/* // TODO: add title field with state */}
          {/* // TODO: add background field with state */}
          <CanvasDraw ref={canvasDraw => (this.canvas = canvasDraw)}/>
          <Button onClick={(evt) => this.handleSubmit(evt)}>Submit</Button>
          {/* // TODO: create way to save picture to imageData state. See https://github.com/embiem/react-canvas-draw/blob/master/demo/src/index.js */}
        </Stack>
      )
    }
    else {
      return (
        <Text>The room you are trying to send a message to is unavailable. Please join a room.</Text>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    roomCode: state.room.roomCode,
    roomData: state.room.roomData,
    userName: state.room.userName
  }
}

const mapDispatchToProps = {
  sendMessageToRoom: sendMessageToRoom,
  success: success,
  error: error
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Canvas))
