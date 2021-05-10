import { NavLink, withRouter } from 'react-router-dom'
import { Center, Button, Stack, Text } from '@chakra-ui/react'

const Home = () => {
  return (
      <Center minHeight={['600px', '800px']}>
        <Stack w='400px' mt={['20px', 0]} spacing={16}>
          <Text fontSize="5xl" color="white">Welcome to Doodle Mail!</Text>
          <NavLink exact to="/join">
            <Button width="50%" alignSelf="center" size="lg">
              <Text fontSize="xl" color="black">Get Started</Text>
            </Button>
          </NavLink>
        </Stack>
      </Center>
  )
}

export default withRouter(Home)
