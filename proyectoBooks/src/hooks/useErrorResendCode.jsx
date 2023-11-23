import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorResendCode = (
  resResend,
  setResResend,
  setUserNotFound
) => {
  /// 200 ---------> resend false
  if (resResend?.data?.resend.toString() == "false") {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "There has been an error emailing your code",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  /// 200 ---------> resend true

  if (resResend?.data?.resend) {
    console.log('hola')
    setResResend(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Confirmation code was sent",
      text: "Please, check your email",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  // 404 ----------> 'User not found'

  if (
    resResend?.response?.data?.includes('This user does not exist')
  ) {
    setUserNotFound(() => true);
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval server error",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  // 500 ----------> interval server error
  if (resResend?.response?.status == 500) {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval Server Error",
      text: "There has been an error in our internal servers. Please, try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
