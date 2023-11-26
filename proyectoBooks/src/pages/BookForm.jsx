import { addFavouriteBook, getAllBooks } from "../services/book.service";
import "./BookForm.css";
import { useState, useEffect } from "react";

import { Loading } from "../components/Loading";
import { useAuth } from "../context/authContext";
import { useErrorLikedBooks } from "../hooks/useErrorLikedBooks";

export const BookForm = () => {
  const { likeItem, user } = useAuth();

  const [resFetch, setResFetch] = useState({}); //estado que setea la respuesta
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [resLike, setResLike] = useState({});
  const [like, setLike] = useState(false);
  const [likeOk, setLikeOk] = useState(false);
  const [likedElement, setLikedElement] = useState({});

  const fetch = async () => {
    console.log('se ejecuta el fetch')
    setIsLoading(true);
    const dataBook = await getAllBooks();
    setResFetch(dataBook);
    setIsLoading(false);
  };
  // console.log(resFetch); //RES DEL FETCH

  const handleLike = async (idBook) => {
    setLikedElement({})
    setResLike(await addFavouriteBook(idBook));
    setLike(true);


    user.favBooks.forEach((book) =>{
      console.log('book id', book._id)
      console.log(idBook, book._id, 'hoooolaaaa')

      if(idBook == book._id){
        setLikedElement(book._id)
        console.log('likedElement', likedElement, user)
        fetch()
      }


    })


  };

  useEffect(() => {
    useErrorLikedBooks(resLike, likeItem, setResLike, setLikeOk);
  }, [resLike]);

  useEffect(() => {
    fetch();
    console.log('like', like)
    setLike(false);
    // console.log("cargando", isLoading);
    // console.log("reslike", resLike?.data?.userUpdated?.favBooks);
  }, [like]);






  if (resFetch?.response?.status == 404 || resFetch?.response?.status == 500) {
    setError(true);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <h1>{resFetch?.response?.status}</h1>
        <p>{resFetch?.response?.data}</p>
      </>
    );
  }

  if (resFetch.data != null) {
    return (
      <>
        <div className="book-card book-div">
          {resFetch.data.allBooks.map((item) => {
            return (
              <div className="primary-div" key={item._id}>
                <div className="title-book">
                  <h3>{item.name}</h3>
                  {/* <h3>{item.authors}</h3> */}
                </div>
                <div>
                  {/* <h4>{item.genres}</h4> */}
                  <h4>Published in {item.published}</h4>
                  <h4>{item.pages} pages</h4>
                </div>
                <div>
                  <button
                    className="like"
                    onClick={() => handleLike(item._id)}
                  >
                  { likedElement == item._id ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};
