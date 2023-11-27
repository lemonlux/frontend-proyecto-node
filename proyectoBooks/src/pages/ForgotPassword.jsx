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
  <div className="form-password form-div">
    <h1 className='h1-password'>Forgot password?</h1>
    <p>Don't worry! We will send you a new one to your email</p>

    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="container-div form-div password-form-div">
      <label htmlFor="custom-input" className="label">
          Email
        </label>
        <input
          className="input_user"
          type="text"
          id="email"
          name="email"
          autoComplete="false"
          {...register("userEmail", { required: true })}
        />
      </div>
      <div className="btn-div container-div">
        <button
          className="btn"
          type="submit"
          disabled={send}
          style={{ background: send ? "#bf3a62" : "#EE5684" }}
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
