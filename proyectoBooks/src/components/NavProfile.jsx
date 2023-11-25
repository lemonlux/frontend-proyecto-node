import { useAuth } from '../context/authContext'
import './NavProfile'
import { Link } from "react-router-dom"





export const NavProfile = () => {

    const { logout }  = useAuth()



  return (
    <div>
        <Link to='/profile'>
        <div>Profile</div>
        </Link>

        <Link to='/profile/edit'>
        <div>Edit profile</div>
        </Link>

        <Link to='/profile/settings'>
        <div>Account settings</div>
        </Link>

        <Link>
        <div>My favourites</div>
        </Link>

        <div><h4 onClick={() =>logout()}>Log out</h4></div>
    </div>
  )
}
