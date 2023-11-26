import { useAuth } from '../context/authContext';
import './MyFavourites.css'

export const MyFavourites = () => {

const { user } = useAuth();

console.log(user)
  return (
    <div>{ user.favBooks.map((book) =>(
        <h1 key={book._id}>{book.name}</h1>
    ))}</div>
  )
}
