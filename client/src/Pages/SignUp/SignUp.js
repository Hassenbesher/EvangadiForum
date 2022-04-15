import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
// import './../Login/login.css'


const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  //importing global state from context
  const [userData, setUserData] = useContext(UserContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("http://localhost:3001/api/users", form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
    }
  };
  return (
     
    // <section classNameName="header_row">
    //   <div>
    //     <h1>SignUp</h1>
    //     <form onSubmit={handleSubmit}>
    //       <label style={{ width: "100px" }}>First Name: </label>
    //       <input type="text" name="firstName" onChange={handleChange} />
    //       <br />
    //       <label style={{ width: "100px" }}>Last Name: </label>
    //       <input type="text" name="lastName" onChange={handleChange} />
    //       <br />
    //       <label style={{ width: "100px" }}>User Name: </label>
    //       <input type="text" name="userName" onChange={handleChange} />
    //       <br />
    //       <label style={{ width: "100px" }}>Email: </label>
    //       <input type="text" name="email" onChange={handleChange} />
    //       <br />
    //       <label style={{ width: "100px" }}>Password: </label>
    //       <input type="password" name="password" onChange={handleChange} />
    //       <br />
    //       <button>submit</button>
    //     </form>
    //     <Link to="/login">Already have an account?</Link>
    //   </div>
    // </section>
    
    <section id="home" className="hero">
    <div className="slide-home">
      <div className="slide-item">
        <div className="container">  
          <div className="row hero-padd"> 
          <div className="col-md-6 col-12 col-sm-6">
            <div className="authfy-login">
              <div className="authfy-panel panel-login text-center active">
                <div className="authfy-heading">
                    <h3 className="authfy-title">Join the network</h3>
                    <p> Already have an account? 
                    <Link to="/login">Sign in</Link>
                      {/* <a className="lnk-toggler" data-panel=".panel-signup" href="#">
                      Sign in</a>  */}
                      </p>
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

                      <div className="row">
                         <div className="col-lg-6 no-padding">
                         <div className="form-group wrap-input">
                      <input onChange={handleChange}
                        type="text"
                        className="form-control eva_firstname"
                        name="eva_email"
                        placeholder="First name"
                      />
                      <span className="focus-input"></span>
                    </div>
                         </div>
                         <div className="col-lg-6 no-padding">
                         <div className="form-group wrap-input">
                      <input onChange={handleChange}
                        type="text"
                        className="form-control eva_lastname"
                        name="eva_email"
                        placeholder="Last name"
                      />
                      <span className="focus-input"></span>
                    </div>
                         </div>
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
                    <div className="form-group">
                      <p className="term-policy text-muted small"> I agree to the
                      <a href="">privacy policy</a>  and <a href="">terms of service.</a></p>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-blue btn btn-lg btn-primary btn-block"
                        type="submit"
                      >
                        Agree and Join
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
  <Link to="/login">Already have an account ?</Link>
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
  );
};

export default SignUp;
