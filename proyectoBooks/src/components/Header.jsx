import { useAuth } from '../context/authContext'
import { NavLink } from "react-router-dom";
import './Header.css'

export const Header = () => {
  const { user } = useAuth()
  return (
    <>
    <header>

    <div className='logo-title header-div'>
  
         <img
            src="https://res.cloudinary.com/daxddugwt/image/upload/v1700493960/1f4da_svtsai.png"
            alt="logo"
            className="logo"
          />
         <NavLink to='/'>
            <h1 className="title-header header">Booki</h1>
            </NavLink>
    </div>  

    <nav>


  {user == null && (
  <NavLink to='/register'>
    <h1 className='header'>Create an account</h1>
  </NavLink>
)}

{user == null && (
  <NavLink to='/login'>
    <h1 className='header'>Log in</h1>
  </NavLink>
)}
{user !== null && (
  <NavLink to='/dashboard'>
    <h1 className='header'>Dashboard</h1>
  </NavLink>
)}

{user !== null && (
  <NavLink to='/profile'>
    <h1 className='header'>Profile</h1>
  </NavLink>
)}


    </nav>




    </header>
   
    </>
  )
}
