import React, { Component } from 'react';
import axios from 'axios';
import { NavMenu } from './NavMenu';
import { Col, Grid, Row } from 'react-bootstrap';

export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);
        this.state = { email: "", password: "", isLoggedIn: false, error: "" };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.makeChange = this.makeChange.bind(this);
        //this.getData = this.getData.bind(this);
        //this.getBusinessLoginData = this.getBusinessLoginData.bind(this);
        this.getData = this.getData.bind(this);
    }

    getData() {

        console.log("test");
        axios.get('http://localhost:55899/api/BusinessLogins')
            .then(res => {
                console.log(res.data);

                if (this.state.email == res.data[0].email && this.state.password == res.data[0].psswd) {
                    this.setState({
                        isLoggedIn: true
                    });
                }
                else {
                    this.setState({
                        error: "The credentials used are incorrect"
                    });
                }
                //this.setState({
                //    businessCity: res.data[0].businessCity
                //});
            })
    }


    makeChange() {
        if (this.state.isLoggedIn === false) {
            console.log("hit me")
            this.setState({
                isLoggedIn: true
            });

        } else {
            this.setState({
                isLoggedIn: false
            });

        }
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
        
           if (this.state.isLoggedIn === false) {
            return (
                <div>
                    <h2> Login Page </h2>
                    <button onClick={this.getData}> Click Me</button>

                    <form>
                        <h1>Hello</h1>
                        <p>Enter your name:</p>
                        <input
                            type="text"
                            name="username"

                            onChange={this.setEmail}
                        />
                        <p>Password</p>
                        <input type="password" name="psw" onChange={this.setPassword} />
                        <p>{this.state.error}</p>

                    </form>
                </div>

            );
        }
        else {
            return (
                <Grid fluid>
                    <Row>
                        <Col sm={3}>
                            <NavMenu />
                            
                        </Col>
                        <Col sm={9}>
                            {this.props.children}
                        </Col>

                    </Row>
                </Grid>
            );
        }

    }
}
