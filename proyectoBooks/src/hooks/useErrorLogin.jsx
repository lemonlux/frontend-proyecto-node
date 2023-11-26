import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorLogin = (res, setRes, userLogin, setLoginOk) =>{
 //! -----------------200

  if (res?.status == 200) {  //si el login se hace correctamente, sacamos la data de la response
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.userName,
      name: res.data.user.name,
      gender: res.data.user.gender,
      email: res.data.user.userEmail,
      image: res.data.user.image,
      check: res.data.user.check,
      _id: res.data.user._id,
      favBooks: res.data.user.favBooks,
    };

    const stringUser = JSON.stringify(dataCustom);
    userLogin(stringUser); //tengo que enviarle al login el objeto hecho a string
    setLoginOk(() => true);
}

  //! ----------------- 404: 'User no register'

  if (res?.response?.data?.includes('This user is not registered')) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "User is not registered",
      text: "Please register the user first",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //!------------------ 404: 'password dont match'

  if (res?.response?.data?.includes('Wrong password')) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Wrong password",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  //! ----------------- 500
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval Server Error",
      text: "There has been an error in our internal servers. Please try again.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
}