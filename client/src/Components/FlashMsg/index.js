import React from "react";
import styled from 'styled-components';



const StyledFlash = styled.p`
   color: #FFF;
   text-align: center;
   font-weight: bold;
`;


const StyledFlashError = styled(StyledFlash)`
    color: #C00000;
    background-color: rgba(#C00000,.1);
`;


class FlashMsg extends React.Component {

   constructor(props) {
      super(props);
      this.timerID = null;
   }

   componentDidMount() {
      if( this.props.autohide ) {
         this.timerID = setTimeout(
            () => {
               this.props.onHide();
            },
            this.props.autohide === true ? 5000 : this.props.autohide
         );
      }
   }

   componentWillUnmount() {
      clearTimeout(this.timerID);
   }


   render() {

      let GeneratedFlash;
      switch( this.props.type ) {

         case 'error':
            GeneratedFlash = StyledFlashError;
            break;

         default:
            GeneratedFlash = StyledFlashError;
      }

      return (
         <GeneratedFlash {...this.props}>
            {this.props.children}
         </GeneratedFlash>
      );
   }
}

export default FlashMsg;