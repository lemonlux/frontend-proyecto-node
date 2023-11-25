
import { getAllBooks } from '../services/book.service'
import './BookForm.css'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useErrorGetBooks } from '../hooks/useErrorGetBooks';
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { BookCard } from '../components/BookCard';
import { Loading } from '../components/Loading';


export const BookForm = () => {

    const [res, setRes] = useState({}); //estado que setea la respuesta
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    const fetch = async () =>{
        const dataBook = await getAllBooks()
        setRes(dataBook)  
        setIsLoading(false)
      }

    useEffect(() =>{
        fetch()
        }, [])



    if(res?.response?.status == 404 || res?.response?.status == 500 ){
        setError(true)
        }


console.log(res)

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
    console.log('entro', res.data.allBooks)

    return (
        <>
        <div>
        <BookCard books={res.data.allBooks} />
        </div>
        </>
    )

  }





}
