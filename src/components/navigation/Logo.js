import { Flex, Icon, Text } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import { NavLink, withRouter } from 'react-router-dom'

const Logo = (props) => {
  return(
    <Flex style={{flexDirection: 'row'}} {...props}>
      <Icon as={FaPaperPlane} boxSize="1.6em" color="orange" style={{margin: 'auto 16px auto 16px'}} />
      <NavLink exact to="/">
        <Text fontSize="5xl" fontWeight="bold" style={{ fontFamily: 'Fredericka the Great' }}>
          <span style={{color: "green"}}>Doodle</span> Mail
        </Text>
      </NavLink>
    </Flex>
  )
}

export default withRouter(Logo)
