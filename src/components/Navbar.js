import {
  NavLink,
  withRouter
} from 'react-router-dom'
import {
  PageHeader,
  Button
} from 'antd'

const NavBar = () => {
  return (
    <PageHeader
      className = "site-page-header"
      title = "Doodle Mail"
      extra = {[
        <Button
          key = "1"
          type = "primary"
        >
          <NavLink exact to='/login'>
            Login
          </NavLink>
        </Button>
      ]}
    >
    </PageHeader>
  )
}

export default withRouter(NavBar)
