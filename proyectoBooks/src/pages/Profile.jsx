import { NavProfile } from '../components/zindex'
import './Profile.css'
import { Outlet } from "react-router-dom"
export const Profile = () => {
  return (
    <div className='profile-div'>
     <NavProfile />
     <div className='div-outlet'>
      <Outlet />
      </div>
    </div>
  )
}
