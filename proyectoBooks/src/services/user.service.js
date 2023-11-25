import { updateToken } from "../utils/index";
import { APIUser } from "./service.config";

//! ------------------------- REGISTER ----------------------------------

export const registerUser = async (formData) => {
  return APIUser.post("/users/redirectRegister", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------- VERIFY CODE -------------------------------

export const verifyConfirmationCode = async (formData) => {
  return APIUser.post("/users/verify", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------- RESEND CODE --------------------------------

export const resendConfirmationCode = async (formData) => {
  return APIUser.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------- AUTOLOGIN ----------------------------------

export const autoLoginUser = async (formData) => {
  return APIUser.post("users/login/autoLogin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------------------------- LOGIN -------------------------------

export const regularLoginUser = async (formData) => {
  return APIUser.post("users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ----------------------- SET NEW PASSWORD --------------------------------

export const setNewPasswordNoAuth = async (formData) => {
  return APIUser.patch("/users/password/setNewPassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//*--------------------------------------------------------------------------------
//*---------------------------------- CON AUTH -------------------------------------
//*--------------------------------------------------------------------------------

//! ------------------------ CHANGE PASSWORD -------------------------------

export const changePassword = async (formData) => {
  return APIUser.patch("/users/modifyPassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -------------------------- UPDATE USER ------------------------------

export const updateUser = async (formData) => {
  return APIUser.patch("/users/update/updateUser", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -------------------------- DELETE USER ------------------------------

export const deleteUser = async (formData) => {
  return APIUser.delete("/users/", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
