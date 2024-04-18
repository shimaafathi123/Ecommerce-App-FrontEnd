 
import { Link } from 'react-router-dom'
 
import { useState, useEffect } from 'react';
import axios from '../../axios/axiosInstance';

 



function Sidebar() {
    const [userInfo, setUserInfo] = useState('alaa');
    //const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
              console.log('alaa')
                const response = await axios.get('/get_current_user_info/');
                setUserInfo(response.data);
                console.log(response.data)
            } catch (error) {
                //setError(error.message);
                console.log(error)
            }
        };
  
        fetchUserInfo();
    }, []);

    return (
        <div className="col-lg-3">
           
                <>
                    <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
                        <img
                            src= "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
                            alt=""
                        />
                        <div className="text-center">
                        <h3 className="mb-0">{userInfo?.fullname}</h3>
                            <p className="mt-0">
                                <Link to="/editAccount"><i className='fas fa-edit me-2'></i> Edit Account</Link>
                            </p>
                        </div>
                    </div>
                    <ol className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/profile'} className="fw-bold text-dark"> <i className='fas fa-user me-2'></i> Account</Link>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/order'} className="fw-bold text-dark"><i className='fas fa-shopping-cart me-2'></i>Orders</Link>
                            </div>
                            <span className="badge bg-primary rounded-pill">14</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/wishlist'} className="fw-bold text-dark"><i className='fas fa-heart fa-fade me-2'></i> Wishlist</Link>
                            </div>
                            <span className="badge bg-primary rounded-pill">14</span>
                        </li>
                        
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to={'/editAccount'} className="fw-bold text-dark"><i className='fas fa-gear fa-spin me-2'></i> Setting</Link>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <Link to={'/home'} className="fw-bold text-dark"><i className='fas fa-gear fa-spin me-2'></i> Home</Link>
                        </div>
                       </li>
                        
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <Link to="/logout" className="fw-bold text-danger"><i className='fas fa-sign-out me-2'></i> Logout</Link>
                            </div>
                        </li>
                    </ol>
                </>
            
        </div>
    )
}

export default Sidebar