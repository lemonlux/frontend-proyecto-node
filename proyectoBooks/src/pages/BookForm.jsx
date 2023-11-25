
import { getAllBooks } from '../services/book.service'
import './BookForm.css'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useErrorGetBooks } from '../hooks/useErrorGetBooks';
import Swal from "sweetalert2/dist/sweetalert2.all.js";


export const BookForm = () => {

    const [res, setRes] = useState({}); //estado que setea la respuesta
    const [state, setState] = useState({
        data: null,
        isLoading: null,
        hasError: null,
        error: null,
        errorMessage: null,
    })

    const fetch = async () =>{
        setState({ ...state, isLoading: true})
        setRes( await getAllBooks())  //setear la respuesta con el servicio
        setState({ ...state, data: res.data, isLoading: false})
      }


    useEffect(() =>{
        fetch()
        }, [])

    if(res?.response?.status == 404 || res?.response?.status == 500 ){
        setState({ ...state, hasError: res?.response?.data, error: res?.response?.status, errorMessage: res?.response?.data })
        }


console.log(res)

if(state.isLoading){
    return <h1>Loading ...</h1>
}

if(state.hasError){
  return (
    <>
    <h1>{state.error}</h1>
    <p>{state.errorMessage}</p></>
)
  }

  if (state.data != null){
    console.log(state.data)

    return (
        <>
        <h2>
            
        </h2>
        </>
    )

  }





}
