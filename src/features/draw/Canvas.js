import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, Button, Center, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { sendMessageToRoom, updateRoomMessages } from '../rooms/roomSlice'
import { success, error } from '../alerts/alertSlice'
import CanvasDraw from 'react-canvas-draw'
import { withRouter } from 'react-router-dom'
import { FaPlus, FaMinus, FaPaintBrush, FaFillDrip, FaUndo, FaEraser } from 'react-icons/fa'
import { ChromePicker } from 'react-color'
import socket from '../websocket/socket'


class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      title: 'untitled',
      imageData: '',
      backgroundColor: 'white',
      textFieldFocused: false,
      brushColor: 'black',
      brushRadius: 12,
      displayColorPicker: false,
      colorPickerMode: 'brush',
      mobileLayout: ((window.innerWidth < 600) ? true : false)
    }
  }

  componentDidMount() {
    window.addEventListener('resize',
      () => {
        this.setState({ mobileLayout: ((window.innerWidth < 600) ? true : false)})
    })
    socket.on('messages', (messages) => {
      this.props.updateRoomMessages(messages.messages)
    })
    socket.on('error', (err) => {
      this.props.error(`Failed to send message.`)
    })
  }

  componentWillUnmount() {
    socket.off('messages')
    socket.off('error')
  }

  closeColorPicker = () => {
    this.setState({
      displayColorPicker: false
    })
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
    this.setState({
      imageData: canvasData,
    }, () => {
      let sendMessageObject = {
        roomId: this.props.roomData._id,
        messages: [{
          title: this.state.title,
          imageData: this.state.imageData,
          background: this.state.backgroundColor
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
            backgroundColor: '',
            textFieldFocused: false
          })
        }
      })
    })
  }

  render() {
    if (this.props.roomCode != null) {
      return (
        <Stack
          spacing={[4, 4]}
          p={[2, 8]}
          m={2}
          w="100%"
          alignItems="center"
          justifyContent="flex-start"
          onKeyPress={(e) => { if (e.key === 'Enter') this.handleSubmit(e) }}
        >
          <Input
            width={[300, 600]}
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
            canvasWidth={this.state.mobileLayout ? 300 : 600}
            canvasHeight={this.state.mobileLayout ? 300 : 600}
            backgroundColor={this.state.backgroundColor}
            brushColor={this.state.brushColor}
            brushRadius={this.state.brushRadius}
            alignSelf="center"
          />
          <SimpleGrid width={300} columns={3} spacingY="10px">
            <Box>
              <IconButton
                variant="outline"
                colorScheme="black"
                aria-label="Increase brush size"
                icon={<FaPlus/>}
                onClick={() => this.setState({
                  brushRadius: this.state.brushRadius + 4
                })}
              />
              <IconButton
                variant="outline"
                colorScheme="black"
                aria-label="Decrease brush size"
                icon={<FaMinus/>}
                onClick={() => this.setState({
                  brushRadius: (this.state.brushRadius === 4) ? 4 : (this.state.brushRadius - 4)
                })}
              />
            </Box>
            <Box>
              <IconButton
                style={{ backgroundColor: this.state.brushColor }}
                aria-label="Show brush color picker"
                icon={<FaPaintBrush/>}
                color="white"
                onClick={() => this.setState({
                  displayColorPicker: true,
                  colorPickerMode: 'brush'
                })}
              />
              <IconButton
                style={{ backgroundColor: this.state.backgroundColor }}
                aria-label="Show background color picker"
                icon={<FaFillDrip/>}
                onClick={() => this.setState({
                  displayColorPicker: true,
                  colorPickerMode: 'background'
                })}
              />
            </Box>
            <Modal isOpen={this.state.displayColorPicker} onClose={() => this.setState({ displayColorPicker: false })} isCentered={true} size="xs">
              <ModalOverlay/>
              <ModalContent style={{background: 'none', boxShadow: 'none'}}>
                <ModalCloseButton bg="white"/>
                <ModalBody>
                  <Center>
                    <ChromePicker
                      color={ this.state.colorPickerMode === 'background' ? this.state.backgroundColor : this.state.brushColor }
                      onChangeComplete={ (color) => {
                        if (this.state.colorPickerMode === 'background') {
                          this.setState({
                            backgroundColor: color.hex
                          })
                        } else {
                          this.setState({
                            brushColor: color.hex
                          })
                        }
                      }}
                      width="85%"
                    />
                  </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Box>
              <IconButton
                variant="outline"
                colorScheme="black"
                aria-label="Undo last stroke"
                icon={<FaUndo/>}
                onClick={() => this.canvas.undo()}
              />
              <IconButton
                variant="outline"
                colorScheme="black"
                aria-label="Erase picture"
                icon={<FaEraser/>}
                onClick={() => this.canvas.clear()}
              />
            </Box>
          </SimpleGrid>
          <Button onClick={(e) => this.handleSubmit(e) } color="black" alignSelf="center">Submit</Button>
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
    roomData: state.room.roomData
  }
}

const mapDispatchToProps = {
  sendMessageToRoom: sendMessageToRoom,
  updateRoomMessages: updateRoomMessages,
  success: success,
  error: error
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Canvas))
