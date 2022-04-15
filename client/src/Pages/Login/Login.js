import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./login1.css";
import "./../../css/bootstrap.css"

const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const loginRes = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      //update global state with response from backend(user-info)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate user to homepage
      navigate("/");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);

  return (
    // <section classNameName="header_row">
      <div classNameName="header_row">
        {/* <h1>Login</h1> */}
        {/* <form onSubmit={handleSubmit}>
          <label style={{ width: "100px" }}>Email: </label>
          <input type="text" name="email" onChange={handleChange} />
          <br />
          <label style={{ width: "100px" }}>Password: </label>
          <input type="password" name="password" onChange={handleChange} />
          <br />
          <button>Log In</button>
        </form> */}
        <section id="home" className="hero">
          <div className="slide-home">
            <div className="slide-item">
              <div className="container">
                <div className="row hero-padd"> 
                <div className="col-md-6 col-12 col-sm-6">
                  <div className="authfy-login">
                    <div className="authfy-panel panel-login text-center active">
                      <div className="authfy-heading">
                          <h3 className="authfy-title">Login to your account</h3>
                          <p> Don't have an account? <a className="lnk-toggler" data-panel=".panel-signup" href="#">
                            Create a new account</a> </p>
                      </div>
                      <div className="row">
                        <div className="col-xs-12  col-sm-12">
                          <div className="ajax-return-login"></div>
                          <form   onSubmit={handleSubmit} name="loginForm" className="loginForm" method="POST" >
                          <div className="form-group wrap-input">
                            <input onChange={handleChange}
                              type="email"
                              className="form-control eva_email"
                              name="eva_email"
                              placeholder="Your Email"
                            />
                            <span className="focus-input"></span>
                          </div>
                          <div className="form-group wrap-input">
                            <div className="pwdMask">
                              <input onChange={handleChange}
                                type="password"
                                className="form-control eva_password"
                                name="eva_password"
                                placeholder="Your Password"
                              />
                              <span className="focus-input"></span>
                              <span className="fa fa-eye-slash pwd-toggle"></span>
                            </div>
                          </div>
                          <div className="row remember-row">
                            <div className="col-xs-6 col-sm-6"></div>
                            <div className="col-xs-6 col-sm-6">
                              <p className="forgotPwd"> <a className="lnk-toggler" data-panel=".panel-forgot"
                               href="">Forgot password</a> </p> </div>
                          </div>
                          <div className="form-group">
                            <button
                              className="btn btn-blue btn btn-lg btn-primary btn-block"
                              type="submit"
                            >
                              Submit
                            </button>
                            {/* <div className="new-acc">
                              <a
                                className="login-link lnk-toggler"
                                data-panel=".panel-signup"
                                href="#"
                                >Create an account ?</a
                              >
                            </div> */}
                          </div>
                        </form>
        <Link to="/signup">Create a new account ?</Link>
                        </div>
                      </div>
                    
                    </div>
                  
                  </div>
                </div>
        <div className="col-md-6 col-12 col-sm-6">
                  <div className="padd-text fadeInleft">
                    <small className="small">About</small>
                    <h2 className="title-h2">Evangadi Network</h2>
                    <p class="font-p mg-bt-30">
                                 No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
                              </p>
                              <p class="font-p mg-bt-30">
                                 Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.  
                              </p>
                              <a href="/explained/" class="btn btn-blue">How it works</a>
                  </div>
                </div>
                </div>
                
               
              
              </div>
           
            </div>
         
          </div>
        
        </section>
       
      </div>
    // </section>
  );
};

export default Login;
