import { Text, Button } from '@chakra-ui/react'
import { NavLink, withRouter } from 'react-router-dom'

const MenuItem = ({children, isLast, to = "/", colorScheme, ...rest }) => {
  return (

    <NavLink exact to={to}>
      <Button
        colorScheme={colorScheme}
        size="lg"
      >
        <Text display="block" {...rest}>
          {children}
        </Text>
      </Button>
    </NavLink>
  )
}

export default withRouter(MenuItem)
