import { Text } from '@chakra-ui/react'
import { NavLink, withRouter } from 'react-router-dom'

const MenuItem = ({children, isLast, to = "/", ...rest }) => {
  return (
    <NavLink exact to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </NavLink>
  )
}

export default withRouter(MenuItem)
