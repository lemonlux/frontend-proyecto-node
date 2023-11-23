import './VerifyCode.css'
import {
  verifyConfirmationCode,
  resendConfirmationCode,
} from "../services/user.service";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorVerifyCode, useAutoLogin, useErrorResendCode } from '../hooks/index';


export const VerifyCode = () => {
 //! ---creación de los estados
const [res, setRes] = useState({})   //estado que setea la respuesta
const [send, setSend] = useState(false) //estado de cargando
const [okVerify, setOkVerify] = useState(false) //estado de navegación
const [resResend, setResResend] = useState({}) //reenvio del codigo
const [okDeleteUser, setOkDeleteUser] = useState(false);
const [userNotFound, setUserNotFound] = useState(false);

//!--- llamada a los hooks
const { handleSubmit, register } = useForm(); 
const { allUser, login, setUser } = useAuth()

//! ----- creacion de una funcion que gestiona los datos del formulario
// en el backend, el verify code necesita de email y confirmation code

const formSubmit = async (formData) =>{
  const userLocal = localStorage.getItem('user')      // si el user ha entrado por el login

  if (userLocal == null){ //si no existe, lo buscamos por el register --- allUser
console.log(allUser.data.user.userEmail)
    const customFormData = {
      confirmationCode: parseInt(formData.confirmationCode),   //hay que convertirlo a numero -> nos llega por el formulario
      userEmail: allUser.data.user.userEmail  //el email no nos llega por el formulario, pero lo tendremos seteado
    }
    // console.log('entro'. allUser.data.user.userEmail)
    setSend(true)
    setRes( await verifyConfirmationCode(customFormData))
    setSend(false)


  }else{ //si si tenemos localStorage--- estamos entrando por el login
    //en el localStorage la info es string -- para setear hay que hacerlo en parse
    const parseUser = JSON.parse(userLocal)
    const customFormData = {
      confirmationCode: parseInt(formData.confirmationCode), // lo que nos lleva por el formulario
      userEmail: parseUser.email
    }
    setSend(true)
    setRes( await verifyConfirmationCode(customFormData))
    setSend(false)

  }
}

//! segunda funcion que gestiona datos
  const handleResend = async () => {
    const userLocal = localStorage.getItem('user')
    if (userLocal != null ){   //ha entrado por el login
      
      const parseUser = JSON.parse(userLocal)
      console.log('entro por el login en el resend', parseUser.email)
      const customFormData = {
        userEmail: parseUser.email
      }

      setSend(true)
      setResResend( await resendConfirmationCode(customFormData))
      setSend(false)

    }else{    //del register ---- allUser --- ya parseada
      const customFormData = {
        userEmail: allUser?.data?.user?.userEmail
      }

      setSend(true)
      setResResend( await resendConfirmationCode(customFormData))
      setSend(false)

    }


  };

  //! ---- useEffects que gestionan errores

  useEffect(()=>{
    console.log(res)
    useErrorVerifyCode(
      res,
      setRes,
      setOkVerify,
      setOkDeleteUser,
      login,
      setUserNotFound
    )
  }, [res])

  useEffect(() => {
    useErrorResendCode( resResend,
      setResResend,
      setUserNotFound)
  }, [resResend]);

  //! ----- gestion de los datos de navegación

  if(okVerify){ //esto lo ha seteado el hook de gestion de errores si da una respuesta 200
      /// aqui vamos a hacer  el autologin para cuando viene del register
      // para cuando viene del login lo gestionamos en el usecheckCodeError ---> modificamos el localstorage y el user del contexto
      if (!localStorage.getItem("user")) {
        useAutoLogin(allUser, login);
      } else {
        return <Navigate to="/dashboard" />;
      }
    }

    if(okDeleteUser){
      return <Navigate to='/register'/>
    }

    if(userNotFound){
      return <Navigate to='/login'/>
    }
  
  return (
    <>
      <div className="form-wrap">
        <h1>Verify your email</h1>
        <p>Please enter the 6-digit code that was sent to your email</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              Verification code
            </label>
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("confirmationCode", { required: false })}
            />
          </div>

          <div className="btn_container">
            <button
              id="btnCheck"
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Submit
            </button>
          </div>
          <div className="btn_container">
            <button
              id="btnResend"
              className="btn"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              onClick={() => handleResend()}
            >
              Resend Code
            </button>
          </div>

          <p className="bottom-text">
            <small>
              If the code is not correct, your user will be deleted from the
              database and you will need to register again.{" "}
            </small>
          </p>
        </form>
      </div>
    </>
  );







}
