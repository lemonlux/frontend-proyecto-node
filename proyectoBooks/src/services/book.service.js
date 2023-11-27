import { updateToken } from "../utils/index";
import { APIUser } from "./service.config";



//! ------------------ GET ALL BOOKS: A - Z -------------------

export const getAllBooks = async () => {
    return APIUser.get("/books/sort/sortAtoZ/")
      .then((res) => res)
      .catch((error) => error);

  };



//! ------------------ GET BY ID -------------------

export const getBookById = async (idBook) => {
  return APIUser.get(`/books/${idBook}`)
    .then((res) => res)
    .catch((error) => error);

};



//! -------------------------- DELETE USER ------------------------------

export const deleteBook = async (idBook) => {
  return APIUser.delete(`/books/${idBook}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
