﻿import React, { Component } from 'react';

import { Tabs, Tab, Accordion, Panel, Button } from 'react-bootstrap';

import './css/MemberAccountInfo.css';

import { webAddress } from './reference/reference';

export class MemberAccountInfo extends Component {
    displayName = MemberAccountInfo.name

    constructor(props) {
        super(props);
        this.state = { password: "", re_enteredPassword: "", oldPassword: "", passwordError: false, passwordRetypeError: false, accordionVal: 0, onHome: true };

        this.setOldPassword = this.setOldPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
        this.setRe_EnteredPassword = this.setRe_EnteredPassword.bind(this);
        this.savePassword = this.savePassword.bind(this);
        this.addRetypePasswordBreakPoint = this.addRetypePasswordBreakPoint.bind(this);
        this.addPasswordErrorBreakPoint = this.addPasswordErrorBreakPoint.bind(this);
        this.changeTabs = this.changeTabs.bind(this);
        this.changeAccordion = this.changeAccordion.bind(this);
        this.setAccordion = this.setAccordion.bind(this);

        this.passwordInput = null;
        this.re_EnteredPasswordInput = null;
        this.oldPasswordInput = null;
    }


    setOldPassword(event) {
        this.setState({ passwordError: false });
        this.state.oldPassword = event.target.value;
    }

    setNewPassword(event) {

        this.setState({ passwordError: false });
        this.state.password = event.target.value;

        if (this.state.password !== this.state.re_enteredPassword && (this.state.password !== "" && this.state.re_enteredPassword !== "")) {

            this.setState({ passwordRetypeError: true });
        }
        else {

            this.setState({ passwordRetypeError: false });
        }

    }

    setRe_EnteredPassword(event) {
        this.state.re_enteredPassword = event.target.value;

        if (this.state.password !== this.state.re_enteredPassword && (this.state.password !== "" && this.state.re_enteredPassword !== "")) {

            this.setState({ passwordRetypeError: true });
        }
        else {

            this.setState({ passwordRetypeError: false });
        }

    }


    checkPasswordValidation() {

        if (this.state.oldPassword == "" || this.state.passwordRetypeError == true || (this.state.password == "" || this.state.re_enteredPassword == "")) {
            this.setState({ passwordError: true });
        } else {
            this.setState({ passwordError: false });
            this.savePassword();
        }

    }

    addRetypePasswordBreakPoint() {
        if (this.state.passwordRetypeError == true) {
            return <br />
        }
        else {
            return ""
        }
    }

    addPasswordErrorBreakPoint() {
        if (this.state.passwordError == true) {
            return <br />
        }
        else {
            return ""
        }
    }

    savePassword() {
        console.log("Saving Password");
    }




    changeAccordion(key) {
        console.log(this.state.accordionVal);
        if (key == 1 && this.state.accordionVal == 0) {
            this.state.accordionVal = 1;

        }
        else {
            this.state.accordionVal = 0;
        }

    }

    changeTabs(key) {
        console.log(key);
        if (key != "home") {

            this.setState({ password: "", oldPassword: "", re_enteredPassword: "", passwordError: false, passwordRetypeError: false, accordionVal: 0, onHome: false })
            this.state.password = "";
            this.state.oldPassword = "";
            this.state.re_enteredPassword = "";

            this.passwordInput.value = null;
            this.oldPasswordInput.value = null;
            this.re_EnteredPasswordInput.value = null;


        }
        else {
            this.setState({ onHome: true, accordionVal: 0 })
        }
    }

    setAccordion() {
        if (this.state.onHome == false) {
            return "";
        }
        else {
            return <Accordion defaultActiveKey={this.state.accordionVal} onSelect={this.changeAccordion}>
                <Panel header="Change Password" eventKey={1}>
                    <p>Please enter your current password and then enter in a brand new password!</p>

                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon2">Current Password</span>
                        <input type="password" className="form-control" ref={elem => (this.oldPasswordInput = elem)} onChange={this.setOldPassword} placeholder="Current Password" aria-describedby="basic-addon2" />

                    </div>

                    <br />


                    <div className="input-group">
                        <input type="password" className="form-control" ref={elem => (this.passwordInput = elem)} onChange={this.setNewPassword} placeholder="New Password" aria-describedby="basic-addon2" />
                        <span className="input-group-addon" id="basic-addon2">New Password</span>
                    </div>

                    <br />

                    <div className="input-group">
                        <input type="password" className="form-control" ref={elem => (this.re_EnteredPasswordInput = elem)} onChange={this.setRe_EnteredPassword} placeholder="Re-Enter New Password" aria-describedby="basic-addon2" />
                        <span className="input-group-addon" id="basic-addon2">Re-Enter New Password</span>
                    </div>

                    {this.addRetypePasswordBreakPoint()}

                    <div className={this.state.passwordRetypeError ? 'alert alert-danger fadeIn' : 'alert alert-danger fadeOut'} role="alert"> Passwords do not match! </div>


                    <button type="button" className="btn btn-lg btn-block btn-info" onClick={() => this.checkPasswordValidation()}>Submit</button>

                    {this.addPasswordErrorBreakPoint()}
                    <div className={this.state.passwordError ? 'alert alert-danger fadeIn' : 'alert alert-danger fadeOut'} role="alert"> Please Fill out the form Correctly! </div>
                </Panel>
            </Accordion>;
        }
    }

    render() {
        return (
            <div>
                <h3>Your Account</h3>

                <br />
                <Tabs defaultActiveKey={"home"} onSelect={this.changeTabs} id="uncontrolled-tab-example">
                    <Tab eventKey={"home"} title="Personal">
                        <h3> Personal Information </h3>

                        <br />

                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Username</span>
                            <input type="text" className="form-control" placeholder="Email" aria-describedby="basic-addon1" readOnly />
                        </div>

                        <br />


                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Recipient's first name" aria-describedby="basic-addon2" readOnly />
                            <span className="input-group-addon" id="basic-addon2">First Name</span>
                        </div>

                        <br />


                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Recipient's last name" aria-describedby="basic-addon2" readOnly />
                            <span className="input-group-addon" id="basic-addon2">Last Name</span>
                        </div>

                        <br />

                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Phone Number" aria-describedby="basic-addon2" readOnly />
                            <span className="input-group-addon" id="basic-addon2">Phone Number</span>
                        </div>

                        <br />

                        {this.setAccordion()}


                    </Tab>
                    <Tab eventKey={"address"} title="Address">
                        <h3> Address Information </h3>

                        <br />

                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Address</span>
                            <input type="text" className="form-control" placeholder="Address" aria-describedby="basic-addon1" />
                        </div>

                        <br />

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1">Country</span>
                                    <input type="text" className="form-control" placeholder="Country" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="City" aria-describedby="basic-addon2" />
                                    <span className="input-group-addon" id="basic-addon2">City</span>
                                </div>
                            </div>
                        </div>

                        <br />


                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Postal Code" aria-describedby="basic-addon2" />
                            <span className="input-group-addon" id="basic-addon2">Postal Code</span>
                        </div>

                        <br />
                    </Tab>
                    <Tab eventKey="contact" title="Payment" disabled >
                        <h1>Contract time old</h1>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}