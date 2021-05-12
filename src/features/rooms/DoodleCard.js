import { useEffect, useState } from 'react'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import CanvasDraw from 'react-canvas-draw'
import LZString from 'lz-string'

const DoodleCard = (props) => {
  const [mobileLayout, setMobileLayout] = useState((window.innerWidth < 600) ? true : false)
  const decompressedImageData = LZString.decompressFromUTF16(props.message.imageData)

  useEffect(() => {
    window.addEventListener('resize',
      () => {
        setMobileLayout({ mobileLayout: ((window.innerWidth < 600) ? true : false)})
    })

    return function cleanupListeners() {
      window.removeEventListener('resize', () => {
        setMobileLayout({ mobileLayout: ((window.innerWidth < 600) ? true : false)})
      })
    }
  })

  return(
    <Box p={5} shadow="base" borderWidth="1px" alignItems="center" background="white" rounded={{ md: 'lg' }} overflow="hidden">
      <Flex>
        <Box>{props.message.author}</Box>
        <Spacer/>
        <Box>{new Date(props.message.date).toDateString()}</Box>
      </Flex>
      <hr/>
      <Text>{props.message.title}</Text>
      <CanvasDraw
        canvasWidth={mobileLayout ? 300 : 600}
        canvasHeight={mobileLayout ? 300 : 600}
        disabled={true}
        hideGrid={true}
        saveData={decompressedImageData}
        style={{ margin: 'auto' }}
      />
    </Box>
    )
}

export default DoodleCard
