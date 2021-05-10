import { Box, Text } from '@chakra-ui/react'
import CanvasDraw from 'react-canvas-draw'
import LZString from 'lz-string'

const DoodleCard = (props) => {
  const decompressedImageData = LZString.decompressFromUTF16(props.message.imageData)
  return(
    <Box p={5} shadow="md" borderWidth="1px" alignItems="center" background="white">
      <Text>{props.message.author} - {props.message.date}</Text>
      <hr/>
      <Text>title: {props.message.title}</Text>
      <CanvasDraw
        disabled={true}
        hideGrid={true}
        saveData={decompressedImageData}
        style={{ margin: 'auto' }}
      />
    </Box>
    )
}

export default DoodleCard
