import { useState, useEffect } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../services/user.service";
import { useErrorRegister } from "../hooks/useErrorRegister";
import { useAuth } from "../context/authContext";
import { UploadFile } from "../components/zindex";

export const Register = () => {
  //!--1-- tres estados:
  const [res, setRes] = useState({}); //estado que setea la respuesta
  const [send, setSend] = useState(false); //estado de cargando
  const [okRegister, setOkRegister] = useState(false); //estado de navegacion

  const [gender, setGender] = useState("")

  //!--2-- llamadas a los hooks

  const { allUser, setAllUser, bridgeData } = useAuth();
  const { handleSubmit, register } = useForm(); //handleSubmit gestiona los datos que vienen del form, register los registra del input

  //!--3-- funcion que gestiona los datos del formulario

  const formSubmit = async (formData) => {
    //le entran los datos del formulario
    const inputFile = document.getElementById("file-upload").files;
    console.log(inputFile[0]);

    if (inputFile.length != 0) {
      const customForData = { ...formData, image: inputFile[0] };

      setSend(true);
      setRes(await registerUser(customForData)); //setea la respuesta, y al cambiar la res se lanza el useEffect
      setSend(false);
    } else {
      const customForData = { ...formData };

      setSend(true);
      setRes(await registerUser(customForData)); //setea la respuesta, y al cambiar la res se lanza el useEffect
      setSend(false);
    }
  };

  //!--4-- los useEffect que gestionan la respuesta y llaman al customHook

  useEffect(() => {
    useErrorRegister(res, setOkRegister, setRes);
    if (res?.status == 200) bridgeData('registerOK');
  }, [res]);

  useEffect(() => {
    console.log("esto es allUser", allUser);
  }, [allUser]);

  //!--5-- gestion de los estados de navegación


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // useEffect(() =>{
    if (okRegister) {
      console.log('entro', okRegister);
     return <Navigate to='/verify' />;
   }
  // }, [okRegister])

  return (
    <>
      <div className="form form-div">
        <h1 className="h1-account">Create an account</h1>
        <p>
          Already a member? <Link to="/login">Log in</Link>
        </p>
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

          <div className="container-div form-div gender-div">
            <label htmlFor="custom-input" className="label-gender">
              Gender
             
              <div className="container-div genders" id="gender-div">
                {/* <div className="gender hombre-div"> */}
                <input
                  className="input-gender"
                    type="radio"
                    name="gender"
                    id="hombre"
                    value="hombre"
                    {...register("gender")}
                  />
                  <label htmlFor="hombre" className="label-radio hombre" id='genderid'> 
                    {''}Man{''}
                  </label>
 
                {/* </div>
                <div className="gender mujer-div"> */}
                 <input
                  className="input-gender"
                    type="radio"
                    name="gender"
                    id="mujer"
                    value="mujer"
                    {...register("gender")}
                  />
                  <label htmlFor="mujer" className="label-radio mujer" id='genderid'>
                  {''}Woman{''}
                  </label>

                {/* </div>
                <div className="gender nobinario-div"> */}
                   <input
                  className="input-gender"
                    type="radio"
                    name="gender"
                    id="no-binario"
                    value="no binario"
                    {...register("gender")}
                  />
                  <label
                    htmlFor="otro"
                    className="label-radio no-binario"
                    id='genderid'
                  >Nonbinary
                  </label>
                  {/* <input
                  className="input-gender"
                    type="radio"
                    name="gender"
                    id="no-binario"
                    value="no binario"
                    {...register("gender")}
                  /> */}
 
                {/* </div> */}
              </div>
              </label>
          </div>
          <div className="container-div form-div file">
            <UploadFile />
          </div>
          <div className="btn-div container-div">
            <button
              className={send ? "btn btn-sent" : "btn btn-notsent"}
              type="submit"
              disabled={send}
            >
              {send ? "Cargando..." : "SIGN UP"}
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{" "}
              <Link className="anchorCustom">Terms & Conditions</Link> and{" "}
              <Link className="anchorCustom">Privacy Policy</Link>.
            </small>
          </p>
        </form>
      </div>
      <footer>
        <p></p>
      </footer>
    </>
  );
};
