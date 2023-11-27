import './Login.css'
import { regularLoginUser } from '../services/user.service'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorLogin } from '../hooks/useErrorLogin';

export const Login = () => {
//!---- creacion de los estados

  const [res, setRes] = useState({}); //estado que setea la respuesta
  const [send, setSend] = useState(false); //estado de cargando
  const [okLogin, setLoginOk] = useState(false); //estado de navegacion

//!--- llamada a los hooks

const { handleSubmit, register } = useForm(); 
const { login, setUser } = useAuth()

//!---- funcion que gestiona los datos del formulario

const formSubmit = async (formData) =>{
  setSend(true)
  setRes( await regularLoginUser(formData))  //setear la respuesta con el servicio
  setSend(false)
}


//!--- useEffects que gestionan los errores

useEffect(() =>{
console.log(res)  //!!!! esto haylo que borrarlo eeeee
useErrorLogin(res, setRes, login, setLoginOk)
}, [res])

useEffect(() =>{
  console.log('me lanzo useEffect')      //!! este useEffect se lanza cuando se monta el componente de login - si hay algunos datos almacenados en el localStorage los va a borrar
  setUser(()=> null) //el estado no me pertenece, le pertenece al padre de esta funcion --- useAuth(), por lo que mejor usar una callback
  localStorage.removeItem('user')
}, [])              

//!--- gestion de los estados de navegacion
if(okLogin){
  if (res.data?.user?.check == false){
    return <Navigate to='/verify' />
  }else{
    return <Navigate to='/dashboard'/>
  }
}



  return (
    <>
      <div className="form-login form-div">
        <h1 className='h1-account'>Log in</h1>
        <p>to your account</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="container-div form-div user">
          <label htmlFor="custom-input" className="label username">
              Email
            </label>
            <input
              className="input-login input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("userEmail", { required: true })}
            />
            </div>

            <div className="container-div form-div password">
            <label htmlFor="custom-input" className="label password">
              Password
              </label>
              <input
                className="input-login input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register("password", { required: true })}
              />

            </div>

          <div className="btn-div container-div">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#bf3a62" : "#EE5684" }}
            >
              Log in
            </button>
          </div>
          <p className="bottom-text">
            <small>
              <Link to="/setNewPassword" className="anchorCustom">
                Forgot password?
              </Link>
            </small>
          </p>
          <div className="footerForm">
        <p className='not-div'>
          Not a member? <Link to="/register">Register Here</Link>
        </p>
      </div>
        </form>
      </div>
    </>
  );

}
