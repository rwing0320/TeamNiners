import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        //this.getData = this.getData.bind(this);
        //this.getBusinessLoginData = this.getBusinessLoginData.bind(this);
    }

    setEmail(event) {
        //this.state.email = value
        
        this.state.email = event.target.value
        console.log(this.state.email);
    }

    setPassword(event) {
        this.state.password = event.target.value
        console.log(this.state.password);
    }
    //getData() {

    //    console.log("test");
    //    axios.get('http://localhost:54047/api/APIBusinesses')
    //        .then(res => {
    //            console.log(res.data);
    //            this.setState({
    //                businessCity: res.data[0].businessCity
    //            });
    //        })
    //}

    //getBusinessLoginData() {

    //    console.log("test");
    //    axios.get('http://localhost:54047/api/BusinessLogins')
    //        .then(res => {
    //            console.log(res.data);
    //            this.setState({
    //                email: res.data[0].email
    //            });
    //        })

    //}

    getBusinessLogin() {

    }

    render() {
        return (

            <form>
                <h1>Hello</h1>
                <p>Enter your name:</p>
                <input
                    type="text"
                    name="username"
                   
                    onChange={this.setEmail}
                />
                <p>Password</p> 
                <input type="password" name="psw"  onChange={this.setPassword} />

                
            </form>


       
        );
    }
}
