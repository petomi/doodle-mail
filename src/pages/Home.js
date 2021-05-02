import { NavLink, withRouter } from 'react-router-dom'
import styles from '../styles.js'
import { Center, Button, Stack, Text } from '@chakra-ui/react'

const Home = () => {
  return (
      <Center bg="#1565C0" style={styles.pageBackground}>
        <Stack w='400px' spacing={16}>
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
