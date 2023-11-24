import { NavProfile } from '../components/zindex'
import './Profile.css'
import { Outlet } from "react-router-dom"
export const Profile = () => {
  return (
    <div>
     <NavProfile />
      <Outlet />
    </div>
  )
}
