import { updateToken } from "../utils/index";
import { APIUser } from "./service.config";



//! ------------------ GET ALL BOOKS: A - Z -------------------

export const getAllBooks = async () => {
    return APIUser.get("/books/sort/sortAtoZ/")
      .then((res) => res)
      .catch((error) => error);
  };



  //! ---------------- ADD FAVOURITE BOOK -----------------------

  export const addFavouriteBook = async (idBook) => {
    return APIUser.patch(`/users/addBook/${idBook}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

