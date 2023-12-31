import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorDelete = (resDelete, setResDelete) => {


if (resDelete?.status == 200){
    // const localUser = localStorage.getItem('user')
    // const parseLocalUser = JSON.parse(localUser)

    // const dataCustom = {
    //     favBooks: resLike.data.userUpdated.favBooks,
    //     token: parseLocalUser?.token,
    //     name: resLike.data.userUpdated.name,
    //     gender: resLike.data.userUpdated.gender,
    //     email: resLike.data.userUpdated.userEmail,
    //     image: resLike.data.userUpdated.image,
    //     check: resLike.data.userUpdated.check,
    //     _id: resLike.data.userUpdated._id,
    // }

    // const stringUser = JSON.stringify(dataCustom)
    // likeItem(stringUser)
    setResDelete(() => ({}));
}

if (resDelete?.response?.status == 500 || resDelete?.response?.status == 404 ) {
    setResDelete(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval Server Error",
      text: "There has been an error in our internal servers. Please try again.",
      showConfirmButton: false,
      timer: 3000,
    });

}

}
