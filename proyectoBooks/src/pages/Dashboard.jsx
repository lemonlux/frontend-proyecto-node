import './DashBoard.css'
import { Link } from "react-router-dom";
export const Dashboard = () => {
  return (
    <div className='dashboard-div'>
      <div className='separator-div'>
        <Link to='/books'><h3 className='link-div'>Books</h3></Link>
        <Link to=''><h3 className='link-div'>Authors</h3></Link>
        <Link to=''><h3 className='link-div'>Genres</h3></Link>
      </div>
      <div className='separator-div-dash'>
          <div>
            <h3 className='dashboard'>New this week</h3>
          </div>
          <div>
            <h3 className='dashboard'>Most read</h3>
          </div>
          <div>
            <h3 className='dashboard'>Favourite authors of the moment</h3>
          </div>
          </div>
     </div>
  )
}
