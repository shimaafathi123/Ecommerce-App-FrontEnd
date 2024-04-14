 
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../axios/axiosInstance';
 
 
 


function Account() {
 
   
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
    <div>
    
      <main className="mt-5" style={{ marginBottom: "170px" }}>
        <div className="container">
          <section className="">
            <div className="row">
              <Sidebar />
              <div className="col-lg-9 mt-1">
                <main className="mb-5" style={{}}>
                  
                  <div className="container px-4">
                  
                    <section className=""></section>
                   
                    <section className="">
                      <div className="row rounded shadow p-3">
                        <h2>Hi <span className="fw-bold text-primary">{userInfo.fullname}</span> </h2> {/*{ decoded ?.full_name}, */}
                        <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                          From your account dashboard. you can easily check &amp; view
                          your <a href="">orders</a>, manage your{" "}
                           
                          <Link to="/change-password">ChangePassword</Link>{" "}
                          <Link to="/editAccount">EditAccountInfo</Link>
                        </div>
                      </div>
                    </section>
       
                  </div>
                  
                </main>
              </div>
            </div>
          </section>
        
        </div>
      </main>

    </div>
  )
}

export default Account