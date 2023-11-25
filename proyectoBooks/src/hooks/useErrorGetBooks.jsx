import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorGetBooks = (res, setRes) => {
console.log(res)

if (res?.response?.status == 200) {
    // setRes(() => ({}));
}

  //! -----------------404: 
  if (res?.response?.status == 404) {

    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Not Found",
      showConfirmButton: false,
      timer: 3000,
    });
  }


  //! -----------------500: interval server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Interval server error",
      text: "There was an error in our interval server. Please try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
