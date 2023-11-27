import { NavProfile } from '../components/zindex'
import './Profile.css'
import { Outlet } from "react-router-dom"
export const Profile = () => {
  return (
    <div className='profile-div'>
      <div className='div-navprofile'>
     <NavProfile />
     </div>
     <div className='div-outlet'>
      <Outlet />
      </div>
    </div>
  )
}
