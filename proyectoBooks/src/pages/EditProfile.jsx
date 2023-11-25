import './EditProfile.css'

import { updateUser } from '../services/user.service'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useErrorUpdate } from '../hooks/index';
import { UploadFile, UserProfileData } from '../components/zindex';

import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useDeleteUser } from '../hooks/useDeleteUser';



export const EditProfile = () => {

//! estados
  const [res, setRes] = useState({})   //estado que setea la respuesta
const [send, setSend] = useState(false) //estado de cargando
//! hooks

const { handleSubmit, register } = useForm(); 
const { user, setUser, logout, setDeleteUser } = useAuth()

// //! ------------- default data------ si no quiere cambiar todos sus datos
console.log(user)

//! funcion que gestiona los datos del formulario

const formSubmit = async (formData) =>{
  Swal.fire({
    title: "Save changes?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#DB3236",
    cancelButtonText: "Cancel",
    confirmButtonText: "Save",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const inputFile = document.getElementById("file-upload").files;
      console.log(inputFile, inputFile[0])

      if (inputFile.length != 0) {  // mismo customFormData que en el login
        const customFormData = {
          ...formData,
          image: inputFile[0],
        };

        setSend(true);
        setRes(await updateUser(customFormData));
        setSend(false);
      } else {
        const customFormData = {
          ...formData,
          image: user.image,
        };
        setSend(true);
        setRes(await updateUser(customFormData));
        setSend(false);
      }
    }
  });
}


useEffect(() =>{
  console.log(res)
  useErrorUpdate(res, setRes, logout)
  }, [res])




  return (
    <>
      <div className="containerProfile">
        <div className="containerDataNoChange">
          {/* <FigureUser user={user} /> */}
        </div>
        <div className="form-wrap formProfile">
          <h1>Edit profile</h1>
          <p>Change your profile data </p>

            <UserProfileData user={user}/>

          <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <label htmlFor="custom-input" className="label name">
                Name
              </label>
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                // LO NUEVOOOOOOOO------>
                defaultValue={user?.name}
                {...register("name")}
              />
            </div>

            <div className="container-div form-div gender-div">
            <label htmlFor="custom-input" className="label-gender">
              Gender
              <div className="container-div genders" id="gender-div">
   
                <input
                  className="input--gender"
                    type="radio"
                    name="gender"
                    id="hombre"
                    value="hombre"
                    {...register("gender")}
                  />
                  <label htmlFor="hombre" className="label-radio hombre" id='genderid'> 
                    {''}Man{''}
                  </label>
 
                 <input
                  className="input--gender"
                    type="radio"
                    name="gender"
                    id="mujer"
                    value="mujer"
                    {...register("gender")}
                  />
                  <label htmlFor="mujer" className="label-radio mujer" id='genderid'>
                  {''} Woman{''}
                  </label>

                   <input
                  className="input--gender"
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
              </div>
              </label>
              
          </div>
            <UploadFile />
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}>
                Save changes
              </button>
            </div>
          </form>
            <div className="btn_container">
              <button className='delete' onClick={()=> useDeleteUser(setUser, setDeleteUser)}>
                Delete account
              </button>
            </div>
        </div>
      </div>
    </>
  )
}