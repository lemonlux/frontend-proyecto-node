import { useState } from "react";
import { useAuth } from "../context/authContext";
import "./MyFavourites.css";

export const MyFavourites = () => {
  const { user } = useAuth();
  const [resGet, setResGet]= useState({})

// const handleGetFav = async()=>{


//   setResGet( await getBookById())
// }



console.log(isNaN(user.favBooks))
  // console.log('hola', Array.isArray(user.favBooks)); 
//     // 24 con id

    // if(Array.isArray(user.favBooks)){
  return (
    <>
    <div className="favourites-div">
      <h1>My favourites</h1>
      <div className='book-fav-div fav-div'>
        <h3>Books</h3>
        <div>
          {user.favBooks.map((book) => (
            <p className="fav" key={book._id} key={book}>{book.name}</p>
          ))}
        </div>
      </div>
      <div className='author-fav-div fav-div'>
      <h3>Authors</h3>
      </div>
      <div className='genre-fav-div fav-div'>
      <h3>Genres</h3>
      </div>
      </div>
    </>
  );
  //         }

  // if(typeof user?.favBooks[0] == "string"){
  //           console.log('holaaaaa')

  //         return (
  //           <>
  //           <div className="favourites-div">
  //             <h1>My favourites</h1>
  //             <div className='book-fav-div fav-div'>
  //               <h3>Books</h3>
  //               <div>
  //                 {user.favBooks.map((book) => (
  //                   <p className="fav" key={book}>{book}</p>
  //                 ))}
  //               </div>
  //             </div>
  //             <div className='author-fav-div fav-div'>
  //             <h3>Authors</h3>
  //             </div>
  //             <div className='genre-fav-div fav-div'>
  //             <h3>Genres</h3>
  //             </div>
  //             </div>
  //           </>
  //         );


  //                 }

};
