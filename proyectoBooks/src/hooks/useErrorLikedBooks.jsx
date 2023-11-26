import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorLikedBooks = (resLike, likeItem, setResLike, setLikeOk) => {


if (resLike?.status == 200){
    const localUser = localStorage.getItem('user')
    const parseLocalUser = JSON.parse(localUser)

    const dataCustom = {
        favBooks: resLike.data.userUpdated.favBooks,
        token: parseLocalUser?.token,
        name: resLike.data.userUpdated.name,
        gender: resLike.data.userUpdated.gender,
        email: resLike.data.userUpdated.userEmail,
        image: resLike.data.userUpdated.image,
        check: resLike.data.userUpdated.check,
        _id: resLike.data.userUpdated._id,
        rol: resLike.data.userUpdated.rol,
    }

    const stringUser = JSON.stringify(dataCustom)
    likeItem(stringUser)
    setLikeOk(true)
    setResLike(() => ({}));
}

if (resLike?.response?.status == 500 || resLike?.response?.status == 404 ) {
    setResLike(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval Server Error",
      text: "There has been an error in our internal servers. Please try again.",
      showConfirmButton: false,
      timer: 3000,
    });

}

}
