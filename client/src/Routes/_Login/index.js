import React from "react";
import { Link } from "react-router-dom";
import Checkbox from '@material/react-checkbox';
import Layout from "Components/LayoutExterne/";

import { CSSTransitionGroup } from 'react-transition-group';

// import MaterialIcon from "@material/react-material-icon";
import "./style.css";


import FlashMsg from 'Components/FlashMsg/';


class Home extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         email    : '',
         password : '',
         remember : {
            checked: false,
            indeterminate: false
         },
         message : ''
      };

      this.test='jghjh';

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addMsg = this.addMsg.bind(this);
      this.removeMsg = this.removeMsg.bind(this);
   }

   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
         [name]: value
      });
   }

   addMsg(txt) {
      this.setState({message: txt});
   }
   removeMsg() {
      this.setState({message: ''});
   }

   handleSubmit(e) {
      e.preventDefault();
      let self = this;
      // self.setState({ message : "" });
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
            self.addMsg("Mauvaise réponse du réseau.");
      })
      .then(function(response) {
         if( response.errcode )
            self.addMsg(response.message);
         else
            console.log('logged !', response);
      })
      .catch(function(error) {
         self.addMsg("Une erreur est survenue.");
         console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
      });
   }

   render() {
      return (
         <Layout className="p-login">
            <div className="card-header">
               <h3>Sign In</h3>
               <div className="d-flex justify-content-end social_icon">
                  <span><i className="fab fa-facebook-square"></i></span>
                  <span><i className="fab fa-google-plus-square"></i></span>
                  <span><i className="fab fa-twitter-square"></i></span>
               </div>
            </div>
            <div className="card-body">

               <CSSTransitionGroup
                  transitionName="slideDown"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}>
                  {!!this.state.message &&
                     <FlashMsg key={new Date()} type="error" autohide="2500" onHide={this.removeMsg}>
                        {this.state.message}
                     </FlashMsg>
                  }
               </CSSTransitionGroup>

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

         </Layout>
      );
   }

}

export default Home;
