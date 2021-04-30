import React from 'react'
import Logo from './Logo'
import MenuLinks from './MenuLinks'
import MenuToggle from './MenuToggle'
import NavBarContainer from './NavBarContainer'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props}>
      <Logo
        w="200px"
        // color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen}/>
      <MenuLinks isOpen={isOpen}/>
    </NavBarContainer>
  )
}

export default NavBar
