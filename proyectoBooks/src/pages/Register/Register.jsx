import { useState, useEffect } from 'react'
import './Register.css'
import { useForm } from "react-hook-form";
import { registerUser } from '../../services/user.service';
import { useErrorRegister } from '../../hooks/useErrorRegister';

export const Register = () => {
 //!--1-- tres estados:
const [res, setRes] = useState({})   //estado que setea la respuesta
const [send, setSend] = useState(false) //estado de cargando
const [ok, setOk] = useState(false) //estado de navegacion

//!--2-- llamadas a los hooks

const { handleSubmit, register } = useForm()  //handleSubmit gestiona los datos que vienen del form, register los registra del input

//!--3-- funcion que gestiona los datos del formulario

const formSubmit = async (formData) =>{ //le entran los datos del formulario

    const customForData = { ...formData, gender: 'mujer' }

    setSend(true)
    setRes( await registerUser(customForData)) //setea la respuesta, y al cambiar la res se lanza el useEffect
    setSend(false)

}

//!--4-- los useEffect que gestionan la respuesta y llaman al customHook

useEffect(() => {
    console.log(res);
    useErrorRegister(res, setOk, setRes);
  }, [res]);

//!--5-- gestion de los estados de navegación

if(ok){
    console.log('registrado')
}
return (
<>
<div className="form form-div">
        <h1>Create an account</h1>
        <p>Already a member? <a href='#'>Log in</a></p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="container-div form-div user">
          <label htmlFor="custom-input" className="label username">
              Username
            </label>
            <input
              className="input input-user"
              type="text"
              id="name"
              name="userName"
              autoComplete="false"
              {...register("userName", { required: true })}
            />
          </div>
          <div className="container-div form-div password">
          <label htmlFor="custom-input" className="label password">
              Password
            </label>
            <input
              className="input input-password"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
          </div>
          <div className="container-div form-div email">
          <label htmlFor="custom-input" className="label email">
              Email
            </label>
            <input
              className="input input-email"
              type="email"
              id="email"
              name="userEmail"
              autoComplete="false"
              {...register("userEmail", { required: true })}
            />
          </div>

          <div className="btn-div container-div">
            {console.log(send)}
            <button
              className={ send ? 'btn btn-sent' : 'btn btn-notsent'}
              type="submit"
              disabled={send}
            >
              {send ? "Cargando..." : "SIGN UP"}
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{" "}
              <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </small>
          </p>
        </form>
      </div>
      <footer>
        <p>
        </p>
      </footer>


</>
)

}

