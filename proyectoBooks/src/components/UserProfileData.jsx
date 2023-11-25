import './UserProfileData.css'

export const UserProfileData = (user) => {
    console.log(user.user.gender)
    return (
        <div className='info-user'>
        <figure className='profile-picture'>
            <img src={user?.user.image} alt='user image' className='profile-picture-user'/>
            <div>
        <p>{user?.user.user}</p>
          <p>{user?.user.name}</p>
          <p>{user?.user.email}</p>
          <p>{user?.user.gender}</p>
          </div>

        </figure>
        </div>
    )

}
