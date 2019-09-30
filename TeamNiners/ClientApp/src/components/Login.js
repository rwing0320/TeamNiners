﻿import React, { Component } from 'react';
import axios from 'axios';
import { NavMenu } from './NavMenu';
import { Dashboard } from './Dashboard';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import './LoginPage.css';
import { EmployeeNav } from './EmployeeNav';

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

        this.emailInput = null;
        this.passwordInput = null;
    }



    getData() {

        let employee = {
            email: this.state.email,
            psswd: this.state.password
        }


        axios.post('http://localhost:63567/api/BusinessLogins/authenticate', {
            email: this.state.email,
            psswd: this.state.password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("test");
        //axios.get('http://localhost:63567/api/BusinessLogins')
        //    .then(res => {
        //        console.log(res.data);

        //        if (this.state.email == res.data[0].email && this.state.password == res.data[0].psswd) {
        //            this.setState({
        //                isLoggedIn: true
        //            });
        //        }
        //        else {
        //            this.setState({
        //                error: "The credentials used are incorrect"
        //            });
        //        }
        //        //this.setState({
        //        //    businessCity: res.data[0].businessCity
        //        //});
        //    })
    }


    setEmail(event) {
        //this.state.email = value
        this.setState({ error: "" });
        this.state.email = event.target.value;
        console.log(this.state.email);
    }

    setPassword(event) {
        this.setState({ error: "" });
        this.state.password = event.target.value;
        console.log(this.state.password);
    }

    makeChange() {
        if (this.state.isLoggedIn === true) {
            this.setState({
                isLoggedIn: false
            });
        }
        else {

            if (this.state.isLoggedIn === false && this.state.email != "" && this.state.password != "") {
                console.log("hit me")
                this.setState({
                    isLoggedIn: true
                });

            } else {

                if (this.state.email == "" && this.state.password == "") {
                    this.setState({
                        isLoggedIn: false,
                        error: "Please Fill out both the username and the password! "
                    });

                    this.emailInput.focus();
                }
                else if (this.state.email == "") {
                    this.setState({
                        isLoggedIn: false,
                        error: "Please Fill out the username! "
                    });
                    this.emailInput.focus();
                }
                else {
                    this.setState({
                        isLoggedIn: false,
                        error: "Please Fill out the password! "
                    });
                    this.passwordInput.focus();
                }


            }
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


    render() {
        
        if (this.state.isLoggedIn === false) {

            return (
                <div className="rowLogin">
                    <form className="form-signin">
                        <img className="login_icon" src={require('./img/9ners_Logo.svg')} alt="company_logo" width="90" height="90" />
                        <h1 className="h3 mb-3 font-weight-normal"> Employee Sign In </h1>
                        <label htmlFor="employeeEmail" className="sr-only">Email</label>
                        <input type="email" ref={elem => (this.emailInput = elem)} onChange={this.setEmail} id="employeeEmail" className="form-control" placeholder="Email Address" required autoFocus />

                        <label htmlFor="employeepassword" className="sr-only">Password</label>
                        <input type="password" ref={elem => (this.passwordInput = elem)} onChange={this.setPassword} id="employeepassword" className="form-control" placeholder="Password" required />
                        <br />
                       
                        <Button onClick={this.getData} className="btn btn-lg btn-primary btn-block"> Login </Button>
                        <br />

                        <Accordion>
                            <Panel header="Forgot Password" eventKey='1'>
                                Please reach out to your business IT department to retreive your credentails!
                            </Panel>
                        </Accordion>


                        <p id="errorMessage">{this.state.error} </p>

                        <br />
                        <p className="mt-5 mb-3 text-muted">© 2019</p>
                    </form>
                </div>



            );
            //return (
            //    <div>
            //        <h2> Login Page </h2>
            //        <button onClick={this.getData}> Click Me</button>

            //        <form>
            //            <h1>Hello</h1>
            //            <p>Enter your name:</p>
            //            <input
            //                type="text"
            //                name="username"

            //                onChange={this.setEmail}
            //            />
            //            <p>Password</p>
            //            <input type="password" name="psw" onChange={this.setPassword} />
            //            <p>{this.state.error}</p>

            //        </form>
            //    </div>

            //);
        }
        else {
            return (
                <div>
                    <EmployeeNav updateParentState={this.makeChange.bind(this)}>
                    </EmployeeNav>
                    <Dashboard>
                    </Dashboard>
                </div>
                //<Grid fluid>
                //    <Row>
                //        <Col sm={3}>
                //            <NavMenu />
                            
                //        </Col>
                //        <Col sm={9}>
                //            {this.props.children}
                //        </Col>

                //    </Row>
                //</Grid>
            );
        }

    }
}
