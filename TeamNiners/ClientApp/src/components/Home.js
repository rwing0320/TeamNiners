import React, { Component } from 'react';
import axios from 'axios';
import { MemberNav } from './MemberNav'

import { webAddress } from './reference/reference';

export class Home extends Component {
  displayName = Home.name

    constructor(props) {
    super(props);
    this.state = { businessCity: "", email: "" };
        this.getData = this.getData.bind(this);
        this.getBusinessLoginData = this.getBusinessLoginData.bind(this);


        axios.get(webAddress + 'api/member/memberId', {
            
        })
            .then(function (response) {
                console.log("The member info for Login on home page is: " + response.data[0] + " , " + response.data[1] + " , " + response.data[2]);

            })
            .catch(function (error) {
                //errorMessage = ""
                console.log("this is the error on the login page for saving the id: " + error);
            });
     

  }

    getData() {

        console.log("test");
        axios.get(webAddress + 'api/APIBusinesses')
            .then(res => {
                console.log(res.data);
                this.setState({
                    businessCity: res.data[0].businessCity
                });
            })
    }

    getBusinessLoginData() {

    console.log("test");
            axios.get(webAddress + 'api/BusinessLogins')
        .then(res => {
            console.log(res.data);
            this.setState({
                email: res.data[0].email
            });
        })

    }


    myFunction = () => {
        console.log("test");
        axios.get(webAddress + 'api/APIBusinesses')
            .then(res => {
                console.log(res.data);
            })

    }


  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we've also set up:</p>
        <ul>
          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
            <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
            <button onClick={this.getData}>Click Me</button>
            <button onClick={this.getBusinessLoginData}>Click Me</button>
            <p>{this.state.businessCity} AND the Email is {this.state.email}</p>

        </div>
    );
  }
}
