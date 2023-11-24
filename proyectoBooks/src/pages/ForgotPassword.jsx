import './ForgotPassword.css'
import { setNewPasswordNoAuth } from '../services/user.service'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useErrorForgotPassword } from '../hooks/index';

export const ForgotPassword = () => {

  //! creacion de los estados
const [res, setRes] = useState({})
const [send, setSend] = useState(false)
const [ok, setOk] = useState(false)

//! llamada a los hooks

const { handleSubmit, register } = useForm()

//! funcion formulario

const formSubmit = async (formData) =>{

  setSend(true)
  setRes( await setNewPasswordNoAuth(formData))
  setSend(false)
};

//!--- useEffect

useEffect(()=>{
  console.log('useEffect',res)
  useErrorForgotPassword(res, setOk, setRes)
}, [res])

if(ok){
  return <Navigate to='/login'/>
}

return (
  <>
  <div className="form-wrap">
    <h1>Forgot password?</h1>
    <p className="bottom-text">Don't worry! We will send you a new one to your email</p>

    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="user_container form-group">
        <input
          className="input_user"
          type="text"
          id="email"
          name="email"
          autoComplete="false"
          {...register("userEmail", { required: true })}
        />
        <label htmlFor="custom-input" className="custom-placeholder">
          Email
        </label>
      </div>

      <div className="btn_container">
        <button
          className="btn"
          type="submit"
          disabled={send}
          style={{ background: send ? "#49c1a388" : "#49c1a2" }}
        >
          Get new password
        </button>
      </div>

      <p className="bottom-text">
        <small>Please set a new password as soon as you log into your account. </small>
      </p>
    </form>
  </div>
</>
);




}
