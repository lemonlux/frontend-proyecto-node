import Swal from "sweetalert2/dist/sweetalert2.all.js"



export const useErrorForgotPassword = (res, setOk, setRes) => {
    console.log('entro aqui')


  //! ------------------- 409: user no existe

  if (res?.response?.data?.includes('This user does not exist')) {
    console.log('email', res?.response?.data)
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "This user does not exists",
      text: "Please, register firts",
      showConfirmButton: false,
      timer: 3000,
    });

  }

  //! ------------------- no se puedo actualizar al usuario
  if (res?.response?.data?.updatedUser == false ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "There was a problem updating your user",
      text: "The email we sent you is no longer valid. Please, try again to get a valid new password",
      showConfirmButton: false,
      timer: 4000,
    });
  }

  //! ------------------- cuando no se ha podido enviar el correo 
  if (res?.response?.data?.send == false ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "There was a problem sending the email",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //! ------------------ 200 : todo ok
  if (res?.data?.updatedUser == true ) {
    setOk(() => true);
    setRes(() => ({}));
    Swal.fire({
    icon: 'success',
      title: 'We have sent you a temporary password',
      text: 'Please, check your email',
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //! -------------------- 500 : internal server error

  if (res?.response?.status == 500) {
    console.log('500')
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval server error",
      text: "There was an error in our interval server. Please try again",
      showConfirmButton: false,
      timer: 3000,
    });
  
  }

  
}

