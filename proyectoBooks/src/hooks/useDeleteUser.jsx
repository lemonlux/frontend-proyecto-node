import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteUser } from "../services/user.service";

export const useDeleteUser = (setUser, setDeleteUser) => {
        Swal.fire({
          title: "Delete account?",
          text: "If you delete your account, you will permanently loose your profile and all the information saved",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DB3236",
          cancelButtonColor: "#8E8F91",
          confirmButtonText: "Delete account",
        }).then(async (result) => {
          console.log("result", result);
      
          if (result.isConfirmed) {
            const res = await deleteUser();
      console.log(res)
            switch (res.status) {
              case 200:
                Swal.fire({
                  icon: "success",
                  title: "This user has been deleted",
                  showConfirmButton: false,
                  timer: 3000,
                });
      
                setUser(() => null);
                setDeleteUser(() => true);
                localStorage.removeItem("user");
      
                break;
      
              default:
                Swal.fire({
                  icon: "error",
                  title: "There was an error deleting your user",
                  text: "Please, try again",
                  showConfirmButton: false,
                  timer: 3000,
                });
      
                break;
            }
          }
        });
      };
      
