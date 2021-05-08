import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Center, Container, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Stack, Text } from '@chakra-ui/react'
import { sendMessageToRoom } from '../rooms/roomSlice'
import { success, error } from '../alerts/alertSlice'
import CanvasDraw from 'react-canvas-draw'
import { withRouter } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { FaPlus, FaMinus, FaUndo, FaEraser } from 'react-icons/fa'
import { ChromePicker } from 'react-color'
import lz from 'lz-string'


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
      colorPickerMode: 'brush'
    }
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
    let canvasData = lz.compress(this.canvas.getSaveData())
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
      // TODO: add mobile styling
      return (
        <Container>
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
              canvasWidth={isMobile ? 1000 : 280}
              canvasHeight={isMobile? 1000 : 280}
              backgroundColor={this.state.backgroundColor}
              brushColor={this.state.brushColor}
              brushRadius={this.state.brushRadius}
            />
            <Stack spacing={4} direction="row" align="center">
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
              <Spacer/>
              <Text fontSize="lg">Brush:</Text>
              <IconButton
                style={{ backgroundColor: this.state.brushColor }}
                aria-label="Show brush color picker"
                onClick={() => this.setState({
                  displayColorPicker: true,
                  colorPickerMode: 'brush'
                })}
              />
              <Text fontSize="lg">Background:</Text>
              <IconButton
                style={{ backgroundColor: this.state.backgroundColor }}
                aria-label="Show background color picker"
                onClick={() => this.setState({
                  displayColorPicker: true,
                  colorPickerMode: 'background'
                })}
              />
              <Modal isOpen={this.state.displayColorPicker} onClose={() => this.setState({ displayColorPicker: false })} isCentered={true} size="xs">
                <ModalOverlay/>
                <ModalContent style={{background: 'none', boxShadow: 'none'}}>
                  <ModalCloseButton/>
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
              <Spacer/>
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
            </Stack>
            <Button onClick={(e) => this.handleSubmit(e) } style={{color: 'black', width: '50%', alignSelf: 'center'}}>Submit</Button>
          </Stack>
        </Container>
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
