import React from "react";
import { Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import Layout from "Components/LayoutExterne/";

// import MaterialIcon from "@material/react-material-icon";
import "./style.css";

class Register extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         email    : '',
         password : '',
         pwdCheck : '',
         remember : {
            checked: false,
            indeterminate: false
         },
         message : ''
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
         [name]: value
      });
   }

   handleSubmit(e) {
      e.preventDefault();
      fetch(
         '/api/login',
         {
            method: 'POST',
            headers: {
               'Content-Type':'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
               email    : this.state.email,
               password : this.state.password
            })
         }
      )
      .then(function(response) {
         if( response.ok )
            return response.json();
         else
            this.setState({ loginError : "Mauvaise réponse du réseau." });
      })
      .then(function(datas) {
         console.log(JSON.stringify(datas));
      })
      .catch(function(error) {
         console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
      });
   }

   componentClicked(e) {
      console.log('clicked');
   }
   responseFacebook(response) {
      console.log('responseFacebook', response);
   }
   responseGoogle(response) {
      console.log('responseGoogle', response);
   }

   render() {
      return (
         <Layout className="p-register">

            <div className="card-header text-center">
               <h3>Create your account</h3>
            </div>
            <div className="card-body">
               {this.state.message &&
               <p>
                  {this.state.message}
               </p>
               }
               <form onSubmit={this.handleSubmit}>
                  <div className="input-group form-group">
                     <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                     </div>
                     <input type="text" name="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />

                  </div>
                  <div className="input-group form-group">
                     <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                     </div>
                     <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                  </div>
                  <div className="input-group form-group">
                     <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                     </div>
                     <input type="password" name="pwdCheck" className="form-control" placeholder="Confirm password" value={this.state.passwordconf} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                     <input type="submit" value="Sign up" className="btn float-right login_btn"/>
                  </div>
               </form>
            </div>
            <hr/>
            <div className="text-center" style={{color:'#FFF'}}>
               <p className="text-uppercase font-weight-bold">OR</p>
               <p>
                  <FacebookLogin
                     appId="601485647030673"
                     autoLoad={false}
                     size="small"
                     fields="name,email,picture"
                     onClick={this.componentClicked}
                     callback={this.responseFacebook}
                     icon="fab fa-facebook"
                  />
               </p>
               <p>
                  <GoogleLogin
                     clientId="447712311281-ehh99fc9fdqkv60524baen509av02ns3.apps.googleusercontent.com"
                     onSuccess={this.responseGoogle}
                     onFailure={this.responseGoogle}
                     cookiePolicy={'single_host_origin'}
                     className="text-uppercase"
                  />
               </p>
            </div>
            <div className="card-footer links text-center">
               <Link to="/login">Sign in</Link>
            </div>

         </Layout>
      );
   }

}

export default Register;
