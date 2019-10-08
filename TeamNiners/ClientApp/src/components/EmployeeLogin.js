﻿import React, { Component } from 'react';
import axios from 'axios';
import { NavMenu } from './NavMenu';
import { Dashboard } from './EmployeeDashboard';
import { Redirect } from 'react-router-dom';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import './css/LoginPage.css';
import { EmployeeNav } from './EmployeeNav';
import { Layout } from './Layout';

export class EmployeeLogin extends Component {
    displayName = EmployeeLogin.name


    constructor(props) {
        super(props);
        this.state = { email: "", password: "", isLoggedIn: false, error: "", data1: "" };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.makeChange = this.makeChange.bind(this);
        this.setBusinessName = this.setBusinessName.bind(this);
        this.getData = this.getData.bind(this);

        //this.changePage = this.changePage.bind(this);

        this.emailInput = null;
        this.passwordInput = null;
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
                return true

            } else {

                let emailMatch = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

                if (emailMatch == null) {
                    this.setState({
                        isLoggedIn: false,
                        error: "Please enter a valid email!"
                    });

                    return false;
                }

                if (this.state.email == "" && this.state.password == "") {
                    this.setState({
                        isLoggedIn: false,
                        error: this.state.error + '/n' + "Please Fill out both the username and the password! "
                    });

                    return false;

                    this.emailInput.focus();
                }
                else if (this.state.email == "") {
                    this.setState({
                        isLoggedIn: false,
                        error: "Please Fill out the username! "
                    });
                    this.emailInput.focus();

                    return false;
                }
                else {
                    this.setState({
                        isLoggedIn: false,
                        error: "Please Fill out the password! "
                    });
                    this.passwordInput.focus();

                    return false;
                }


            }
        }
    }

    setBusinessName(bn) {
        console.log("changing business name")
        this.setState({ data1: bn });
    }

    async getData() {
        var businessName;
        if (this.makeChange() != false) {
            let successFlag = false;

            var errorMessage;

            let employee = {
                email: this.state.email,
                psswd: this.state.password
            }

            await axios.post('http://localhost:60696/api/users/authenticate', {
                email: this.state.email,
                psswd: this.state.password
            })
                .then(function (response) {
                    console.log(response);
                    successFlag = true;
                    businessName = response.data.businessName;

                })
                .catch(function (error) {
                    errorMessage = "You have entered in incorrect credentails! Please try Again!"
                    console.log("this is the error: " + error);
                });

            if (successFlag) {
                this.setBusinessName(businessName);
                console.log("hit " + successFlag);

                this.setState({
                    email: "",
                    password: "",
                    
                });

                this.props.updatePageState(this.state.data1);
               
                //this.makeChange();


            } else {
                this.setState({
                    error: errorMessage
                });
                console.log("not hit " + successFlag);
            }
        }

    }

    setEmail(event) {
        this.setState({ error: "" });
        this.state.email = event.target.value
        console.log(this.state.email);
    }

    setPassword(event) {
        this.setState({ error: "" });
        this.state.password = event.target.value
        console.log(this.state.password);
    }


    render() {

     
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
    
    }
}
