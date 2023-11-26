
import { addFavouriteBook, getAllBooks } from '../services/book.service'
import './BookForm.css'
import { useState, useEffect } from "react";

import { Loading } from '../components/Loading';
import { useAuth } from '../context/authContext';


export const BookForm = () => {

  const { like, setLike, user } = useAuth()

    const [res, setRes] = useState({}); //estado que setea la respuesta
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [resLike, setResLike] = useState(false)

    const fetch = async () =>{
        setIsLoading(true)
        const dataBook = await getAllBooks()
        setRes(dataBook)  
        setIsLoading(false)
      }



      const handleLike = async (idBook) =>{
        await addFavouriteBook(idBook)
           setResLike(true)
           console.log('hola', resLike)
      }
      
       console.log


    useEffect(() =>{
        fetch()
        console.log('cargando',isLoading)
        setResLike(false)
        }, [resLike])

    if(res?.response?.status == 404 || res?.response?.status == 500 ){
        setError(true)
        }


if(isLoading){
    return <Loading/>
}

if(error){
  return (
    <>
    <h1>{res?.response?.status}</h1>
    <p>{res?.response?.data}</p></>
)
  }

  if (res.data != null){

    return (
        <>
    <div className='book-card book-div'>
        {res.data.allBooks.map((item) =>{
            return (
                <div className='primary-div' key={item._id}>
                <div className='title-book'>
                    <h3>{item.name}</h3>
                    {/* <h3>{item.authors}</h3> */}
                </div>
                <div>
                    {/* <h4>{item.genres}</h4> */}
                    <h4>Published in {item.published}</h4>
                    <h4>{item.pages} pages</h4>
                </div>
                <div>
            <button  className='like btn' onClick={() => handleLike(item._id, setLike, setResLike, resLike, like, setRes, fetch)}>Like</button>
        </div>
                </div>
                
            )
        })}
    </div>
        
        </>
    )

  }


}
