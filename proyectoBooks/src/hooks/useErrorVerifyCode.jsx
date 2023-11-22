import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorVerifyCode = (
    res,
    setRes,
    setOkVerify,
    setOkDeleteUser,
    login,
    setUserNotFound
  ) => {
    // ---------------------> 500
    if (res?.response?.status == 500) {
      Swal.fire({
        icon: "error",
        title: "Interval Server Error",
        text: "There has been an error in our internal servers. Please try again.",
        showConfirmButton: false,
        timer: 3000,
      });
      setRes(() => ({}));
    }
  
    // ------------------------- 200 test todo correcto
  
    if (res?.data?.testCheckOk?.toString() == "true") {
        console.log(res.data)
      /// si viene del login -- viene del localStorage -> modificamos el estado de user del contexto para poner el check en true
      if (localStorage.getItem("user")) {
        const currentUser = localStorage.getItem("user");
        const parseUser = JSON.parse(currentUser);
        const customUser = {
          ...parseUser,
          check: true,
        };
  
        const stringUser = JSON.stringify(customUser);
        // llamamos a la funcion de login para resetear que el check esta a true
        login(stringUser);
      }
      setOkVerify(() => true);
      setRes(() => ({}));
      Swal.fire({
        icon: "success",
        title: "Your account has been verified",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  
    //TODO ----------------------- PENDIENTE DE EXPLICAR ESTOS ERRRORES ----------------------------------
    // -------------- 200 test = false
  
    if (res?.data?.testCheckOk?.toString() == "false") {
      // el codigo si era correcto pero el actualizar en el back el check no se ha producido correctamente
      setRes(() => ({}));
      Swal.fire({
        icon: "error",
        title: "Interval server error ❎.",
        text: "No delete user. Try again, please.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  
    // -------------- 200: delete: 'ok delete user'
    if (res?.data?.delete?.includes("ok delete user")) {
      // esto le enviamos al register porque le henmos borrrado el usuario
      setOkDeleteUser(() => true);
      setRes(() => ({}));
      Swal.fire({
        icon: "error",
        title: "No correct Code ❎.",
        text: "Your user is delete. Register again, please.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  
    // ------------- 200: delete: 'error delete user'
    if (res?.data?.delete?.includes("error delete user")) {
      setRes(() => ({}));
      Swal.fire({
        icon: "error",
        title: "No correct Code ❎.",
        text: "No delete user. Try again, please.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  
    // ------------- userNoFound ---> 404
  
    if (res?.response?.status == 404) {
      setUserNotFound(() => true);
      setRes(() => ({}));
      Swal.fire({
        icon: "error",
        title: "Interval server error ❎.",
        text: "No delete user. Try again, please.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  