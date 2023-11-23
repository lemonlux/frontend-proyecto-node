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
    <h1>Change your password 💱</h1>

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
          Change password
        </button>
      </div>

      <p className="bottom-text">
        <small>Enter your email to send you the new password 💌</small>
      </p>
    </form>
  </div>
</>
);




}
