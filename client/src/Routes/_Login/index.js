import React from "react";
import { Link } from "react-router-dom";
import Checkbox from '@material/react-checkbox';

// import MaterialIcon from "@material/react-material-icon";
import "./style.css";

class Home extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         email    : '',
         password : '',
         remember : {
            checked: false,
            indeterminate: false
         }
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      console.log(name,value);
      this.setState({
         [name]: value
      });
   }

   handleSubmit(e) {
      e.preventDefault();
      console.log('fetching', this.state.email, this.state.password);
      fetch('/api/login', { email:this.state.email, password:this.state.password })
      .then(function(response) {
         console.log('ok', response);
      })
      .then(function(myJson) {
         console.log(JSON.stringify(myJson));
      });
   }

   render() {
      return (
         <div className="p-login">
            <div className="container">
            <div className="d-flex justify-content-center h-100">
               <div className="card">
                  <div className="card-header">
                     <h3>Sign In</h3>
                     <div className="d-flex justify-content-end social_icon">
                        <span><i className="fab fa-facebook-square"></i></span>
                        <span><i className="fab fa-google-plus-square"></i></span>
                        <span><i className="fab fa-twitter-square"></i></span>
                     </div>
                  </div>
                  <div className="card-body">
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
                        <div className="row align-items-center remember">
                           <Checkbox
                              nativeControlId='my-checkbox'
                              checked={this.state.remember.checked}
                              indeterminate={this.state.remember.indeterminate}
                              onChange={
                                 ( e ) => this.setState( {
                                    remember: {
                                       checked : e.target.checked,
                                       indeterminate : e.target.indeterminate
                                    },
                                 })
                              }
                           />
                           <label htmlFor='my-checkbox'>Remember me</label>
                        </div>
                        <div className="form-group">
                           <input type="submit" value="Login" className="btn float-right login_btn"/>
                        </div>
                     </form>
                  </div>
                  <div className="card-footer links">
                     <p className="d-flex justify-content-center">
                        Don't have an account ? <Link to="/register">Sign Up</Link>
                     </p>
                     <p className="d-flex justify-content-center">
                        <Link to="/forgot_credentials">Forgot your password ?</Link>
                     </p>
                  </div>
               </div>
            </div>

         </div>
         </div>
      );
   }

}

export default Home;
