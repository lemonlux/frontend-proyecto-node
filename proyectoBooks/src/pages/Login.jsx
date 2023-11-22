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
console.log(res)
useErrorLogin(res, setRes, login, setLoginOk)
}, [res])

useEffect(() =>{
  setUser(()=> null) //el estado no me pertenece, le pertenece al padre de esta funcion --- useAuth(), por lo que mejor usar una callback
  localStorage.removeItem('user')
})

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
      <div className="form-wrap">
        <h1>Sign In</h1>
        <p>We are happy to see you again 💌</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("userEmail", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>

            <div className="password_container form-group">
              <input
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register("password", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                password
              </label>
            </div>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              LOGIN
            </button>
          </div>
          <p className="bottom-text">
            <small>
              Have you forgotten the password?
              <Link to="/forgotpassword" className="anchorCustom">
                Change password
              </Link>
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Are you not registered? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </>
  );

}
