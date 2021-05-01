import { Flex, Text } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'

export default function Logo(props) {
  return(
    <Flex style={{flexDirection: 'row'}} {...props}>
      <FaPaperPlane style={{margin: 'auto 4px auto 4px'}} />
      <Text fontSize="3xl" fontWeight="bold">
        Doodle Mail
      </Text>
    </Flex>
  )
}
