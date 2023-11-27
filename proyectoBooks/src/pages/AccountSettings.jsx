import './AccountSettings.css'

import { changePasswordAuth, updateUser } from '../services/user.service'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useDeleteUser } from '../hooks/index';
import { UploadFile } from '../components/UploadFile';

import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useErrorChangePassword } from '../hooks/useErrorChangePassword';



export const AccountSettings = () => {

    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);


    
    const { setUser, setDeleteUser } = useAuth();
    const { handleSubmit, register } = useForm();


    const formSubmit = (formData) => {
        const { password, newPassword, confirmPassword } = formData;
    
        if (newPassword == confirmPassword) {
          Swal.fire({
            title: "Change password?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgb(73, 193, 162)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel,"
          }).then(async (result) => {
            if (result.isConfirmed) {
              setSend(true);
              setRes(await changePasswordAuth({ password, newPassword }));
              setSend(false);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Passwords do not match",
            text: "Your password and confirmation password must match",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      };


      useEffect(()=>{
        useErrorChangePassword(res, setRes, setUser)
      }, [res])




    return (
<>
        <div className='form-login form-div'>
        <div>
          <h1>Account settings</h1>
          <p>Change your settings </p>
        </div>
        <div className="form-wrap">
        <h3>Change password</h3>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="container-div form-div">
          <label htmlFor="custom-input" className="custom-placeholder">
              Current password
            </label>
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
          </div>
          <div className="container-div form-div">
          <label htmlFor="custom-input" className="custom-placeholder">
              New password
            </label>
            <input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register("newPassword", { required: true })}
            />
          </div>
          <div className="container-div form-div">
          <label htmlFor="custom-input" className="custom-placeholder">
              Confirm new password
            </label>
            <input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              {...register("confirmPassword", { required: true })}
            />

          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#bf3a62" : "#EE5684" }}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      </div>
        <button className='delete' onClick={()=> useDeleteUser(setUser, setDeleteUser)}>
        Delete account
      </button>

</>

    )
}
