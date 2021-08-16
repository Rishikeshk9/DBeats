import React from "react";
import axios from "axios";

export default class Example extends React.Component {
    upload(e) {
      e.persist();
      console.log(e.target.files);
      
      const formData  = new FormData();
      formData.append("data", e.target.files[0]);
      
      // NOTE
      // This example uses XMLHttpRequest() instead of fetch
      // because we want to show progress. But you can use
      // fetch in this example if you like.
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (e) => {
        this.setState({ 
          loaded: e.loaded, 
          total: e.total 
        });
      }
      
      xhr.open(
        "POST", 
        "https://api.estuary.tech/content/add"
      );
      xhr.setRequestHeader(
        "Authorization", 
        "Bearer EST6d8352d1-5af4-483c-98e0-c92f3456f097ARY"
      );
     let fileRes =  axios.post('https://api.estuary.tech/content/add', formData);
     console.log("fileResponse: ",fileRes);

      xhr.send(formData);
    }
  
    render() {
      return (
        <React.Fragment>
          <input type="file" onChange={this.upload.bind(this)} />
          <br />
          <pre>{JSON.stringify(this.state, null, 1)}</pre>
        </React.Fragment>
      );
    }
  }