import './BookCard.css'
export const BookCard = ({ books }) => {
  return (
    <div className='book-card book-div'>
        {books.map((item) =>{
            return (
                <div className='primary div' key={item._id}>
                <div className='title-book'>
                    <h3>{item.name}</h3>
                    {/* <h3>{item.authors}</h3> */}
                </div>
                <div>
                    {/* <h4>{item.genres}</h4> */}
                    <h4>Published in {item.published}</h4>
                    <h4>{item.pages} pages</h4>
                </div>
                </div>
            )
        })}
    </div>
  )
}
