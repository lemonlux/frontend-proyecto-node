import { useEffect, useState } from "react"
import { getAllBooks } from "../services/book.service";


export const useFetch = () =>{

    const [res, setRes] = useState({}); //estado que setea la respuesta
    const [state, setState] = useState({
        data: null,
        isLoading: null,
        hasError: null,
        error: null,
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
        setState({ ...state, hasError: true, error: res?.response?.status })
    }
   

    return{
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        error: state.error,
        state,
    }


}