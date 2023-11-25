import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteUser } from "../services/user.service";

export const useDeleteUser = (setUser, setDeleteUser) => {
        Swal.fire({
          title: "Delete account?",
          text: "If you delete your account, you will permanently loose your profile and all the information saved",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DB3236",
          cancelButtonColor: "#d33",
          confirmButtonText: "Delete account",
        }).then(async (result) => {
          console.log("result", result);
      
          if (result.isConfirmed) {
            const res = await deleteUser();
      
            switch (res.status) {
              case 200:
                Swal.fire({
                  icon: "success",
                  title: "Delete User",
                  text: "See you soon",
                  showConfirmButton: false,
                  timer: 1500,
                });
      
                setUser(() => null);
                setDeleteUser(() => true);
                localStorage.removeItem("user");
      
                break;
      
              default:
                Swal.fire({
                  icon: "error",
                  title: "No delete User ❎",
                  text: "Please, try again",
                  showConfirmButton: false,
                  timer: 1500,
                });
      
                break;
            }
          }
        });
      };
      
