import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Stack, Text } from '@chakra-ui/react'
import { sendMessageToRoom } from '../rooms/roomSlice'
import { success, error } from '../alerts/alertSlice'
import CanvasDraw from 'react-canvas-draw'
import { withRouter } from 'react-router-dom'
import { isMobile } from 'react-device-detect'


class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      title: 'untitled',
      imageData: '',
      background: 'white',
      textFieldFocused: false
    }
  }

  toggleTextFieldFocus = () => {
    this.setState({
      textFieldFocused: !this.state.textFieldFocused
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // get image data from canvas
    let canvasData = this.canvas.getSaveData()
    console.log('prev state')
    console.log(this.state)
    this.setState({
      imageData: canvasData,
    }, () => {
      console.log('after state')
      console.log(this.state)
      let sendMessageObject = {
        roomId: this.props.roomData._id,
        userName: this.props.userName,
        messages: [{
          title: this.state.title,
          imageData: this.state.imageData,
          background: this.state.background
        }]
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
            background: '',
            textFieldFocused: false
          })
        }
      })
    })
  }

  render() {
    if (this.props.roomCode != null) {
      return (

        <Stack spacing={8}
          onKeyPress={(e) => { if (e.key === 'Enter') this.handleSubmit(e) }}
        >
          <Input
            pr="4.5rem"
            type="text"
            variant="filled"
            className="form-field"
            placeholder="Enter"
            onFocus={this.toggleTextFieldFocus}
            onBlur={this.toggleTextFieldFocus}
            style={{ color: this.state.textFieldFocused ? 'white' : 'black' }}
            value={this.state.title}
            onChange={(e) => {
              this.setState({
                title: e.target.value
              })}
            }
          ></Input>
          <CanvasDraw
            ref={canvasDraw => (this.canvas = canvasDraw)}
            canvasWidth={isMobile ? 1000 : 600}
            canvasHeight={isMobile? 1000 : 600}
          />
          {/* TODO: add controls for drawing */}
          {/* // TODO: add background field with state */}
          <Button onClick={(e) => this.handleSubmit(e) } style={{color: 'black', width: '50%', alignSelf: 'center'}}>Submit</Button>
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
