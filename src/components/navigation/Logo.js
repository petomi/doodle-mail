import { Flex, Text } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import { NavLink, withRouter } from 'react-router-dom'

const Logo = (props) => {
  return(
    <Flex style={{flexDirection: 'row'}} {...props}>
      <FaPaperPlane style={{margin: 'auto 4px auto 4px'}} />
      <NavLink exact to="/">
        <Text fontSize="3xl" fontWeight="bold">
          Doodle Mail
        </Text>
      </NavLink>
    </Flex>
  )
}

export default withRouter(Logo)
