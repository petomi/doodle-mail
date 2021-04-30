import { Box } from '@chakra-ui/react'
import { FaBars, FaTimes } from 'react-icons/fa'

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <FaTimes/> : <FaBars/>}
    </Box>
  )
}

export default MenuToggle
