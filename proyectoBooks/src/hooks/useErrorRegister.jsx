import Swal from "sweetalert2/dist/sweetalert2.all.js"



export const useErrorRegister = (res, setOk, setRes) => {
    console.log(res)
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    const dataToString = JSON.stringify(res);
    localStorage.setItem("data", dataToString);
    console.log('200')
    setOk(() => true);
    Swal.fire({
    icon: 'success',
      title: 'Register succesful✅',
      text: 'please verify your account',
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  //! ------------------- 409: user ya registrado

  if (res?.response?.data?.includes('this email already exists')) {
    console.log('email', res?.response?.data)
    Swal.fire({
      icon: "error",
      title: "Invalid email",
      text: "Please, enter a valid email",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  //! ------------------- La contraseña no esta en el formato correcto
  if (res?.response?.data?.includes("User validation failed: password:")) {
    console.log('password')
    Swal.fire({
      icon: "error",
      title: "Insuficient password",
      text: "The password must contain 8 characters, 1 upper case, 1 lower case and a special character",
      showConfirmButton: false,
      timer: 4000,
    });
    setRes({});
  }

  //! ------------------- cuando el userName ya existe
  if (
    res?.response?.data?.includes('this username already exists')) {
      console.log('username')
    Swal.fire({
      icon: "error",
      title: "This username is already in use",
      text: "Please, try another one",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  //! -------------------- 500 : internal server error

  if (res?.response?.status == 500) {
    console.log('500')
    Swal.fire({
      icon: "error",
      title: "Interval server error",
      text: "There was an error in our interval server. Please try again",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }
}

