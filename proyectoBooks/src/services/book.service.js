import { updateToken } from "../utils/index";
import { APIUser } from "./service.config";



//! ------------------ GET ALL BOOKS: A - Z -------------------

export const getAllBooks = async () => {
    return APIUser.get("/books/sort/sortAtoZ/")
      .then((res) => res)
      .catch((error) => error);
  };