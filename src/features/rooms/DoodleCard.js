import { useEffect, useState } from 'react'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import CanvasDraw from 'react-canvas-draw'

const DoodleCard = (props) => {
  const [mobileLayout, setMobileLayout] = useState((window.innerWidth < 600) ? true : false)
  const decompressedImageData = props.message.imageData

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
        <Box>{props.message.author.userName}</Box>
        <Spacer/>
        <Box>{new Date(props.message.date).toDateString()}</Box>
      </Flex>
      <hr/>
      <Text>{props.message.title}</Text>
      <CanvasDraw
        loadTimeOffset={5}
        canvasWidth={mobileLayout ? 300 : 600}
        canvasHeight={mobileLayout ? 300 : 600}
        disabled={true}
        hideInterface={true}
        hideGrid={true}
        saveData={decompressedImageData}
        backgroundColor={props.message.background}
        style={{ margin: 'auto' }}
      />
    </Box>
    )
}

export default DoodleCard
