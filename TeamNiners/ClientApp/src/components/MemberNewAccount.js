import React, { Component } from 'react';
import axios from 'axios';
import { NavMenu } from './NavMenu';
import { Dashboard } from './EmployeeDashboard';
import { Redirect } from 'react-router-dom';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import './css/LoginPage.css';
import './css/MemberCreateAccountPage.css';
import { EmployeeNav } from './EmployeeNav';
import { Layout } from './Layout';

export class MemberNewAccount extends Component {
    displayName = MemberNewAccount.name;

    

    constructor(props) {
        super(props);
        this.state = {  firsname: "", lastName: "", phoneNumber: "",email: "", address: "", country: "", city: "", postalcode: "", password: "", retypedpassword: "hello",  error: "", retypeerror: "", data1: "", data2: "" };




        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setRetypePassword = this.setRetypePassword.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setPostalCode = this.setPostalCode.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.setInputed = this.setInputed.bind(this);
        this.validateForm = this.validateForm.bind(this);
        //this.makeChange = this.makeChange.bind(this);
       // this.setBusinessName = this.setBusinessName.bind(this);
        //this.getData = this.getData.bind(this);


        //this.goToMemberHome = this.goToMemberHome.bind(this);
        //this.changePage = this.changePage.bind(this);


        this.emailInput = null;
        this.passwordInput = null;
        this.retypepasswordInput = null;
        this.firstNameInput = null;
        this.lastNameInput = null;
        this.addressInput = null;
        this.countryInput = null;
        this.cityInput = null;
        this.postcodeInput = null;
        this.phoneNumberInput = null;

        this.myArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    }

    checkValid() {

    }

    //makeChange() {
    //    if (this.state.isLoggedIn === true) {

    //        this.setState({
    //            isLoggedIn: false
    //        });
    //    }
    //    else {

    //        if (this.state.isLoggedIn === false && this.state.email != "" && this.state.password != "") {
    //            console.log("hit me")
    //            return true

    //        } else {

    //            let emailMatch = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    //            if (emailMatch == null) {
    //                this.setState({
    //                    isLoggedIn: false,
    //                    error: "Please enter a valid email!"
    //                });

    //                return false;
    //            }

    //            if (this.state.email == "" && this.state.password == "") {
    //                this.setState({
    //                    isLoggedIn: false,
    //                    error: this.state.error + '/n' + "Please Fill out both the username and the password! "
    //                });

    //                return false;

    //                this.emailInput.focus();
    //            }
    //            else if (this.state.email == "") {
    //                this.setState({
    //                    isLoggedIn: false,
    //                    error: "Please Fill out the username! "
    //                });
    //                this.emailInput.focus();

    //                return false;
    //            }
    //            else {
    //                this.setState({
    //                    isLoggedIn: false,
    //                    error: "Please Fill out the password! "
    //                });
    //                this.passwordInput.focus();

    //                return false;
    //            }


    //        }
    //    }
    //}

  
    //async getData() {
    //    var businessName;
    //    var businessId;
    //    if (this.makeChange() != false) {
    //        let successFlag = false;

    //        var errorMessage;

    //        let employee = {
    //            email: this.state.email,
    //            psswd: this.state.password
    //        }

    //        await axios.post('http://localhost:50392/api/users/authenticate', {
    //            email: this.state.email,
    //            psswd: this.state.password
    //        })
    //            .then(function (response) {
    //                console.log(response);
    //                successFlag = true;
    //                businessName = response.data.businessName;
    //                businessId = response.data.id;

    //                console.log("The businessId: " + businessId);

    //            })
    //            .catch(function (error) {
    //                errorMessage = "You have entered in incorrect credentails! Please try Again!"
    //                console.log("this is the error: " + error);
    //            });

    //        if (successFlag) {

    //            this.setBusinessName(businessName, businessId);

    //            await axios.post('http://localhost:50392/api/users/employeeId', {
    //                businessId: businessId
    //            })
    //                .then(res => {
    //                    console.log("The business ID for Login is: " + res.data);

    //                    console.log("hit " + successFlag);

    //                    this.setState({
    //                        email: "",
    //                        password: "",

    //                    });

    //                    this.props.updatePageState(this.state.data1, this.state.data2);
    //                    //this.setState({
    //                    //    businessCity: res.data[0].businessCity
    //                    //});

    //                })
    //                .catch(function (error) {
    //                    errorMessage = ""
    //                    console.log("this is the error on the login page for saving the id: " + error);
    //                });




    //            //this.makeChange();


    //        } else {
    //            this.setState({
    //                error: errorMessage
    //            });
    //            console.log("not hit " + successFlag);
    //        }
    //    }

    //}

    setEmail(event) {
        this.setState({ error: "" });
        this.state.email = event.target.value

        this.setInputed(this.state.email, 3);
    }

    setPassword(event) {
        this.setState({ error: "" });
        this.state.password = event.target.value

        this.setInputed(this.state.password, 8);
    }

    setRetypePassword(event) {

        

        this.setState({ error: "" });
        this.state.retypedpassword = event.target.value

        this.setInputed(this.state.retypedpassword, 9);

        if (this.state.retypedpassword != this.state.password && (this.state.password != "" && this.state.retypedpassword!= "")) {
            this.setState({ retypeerror: "The passwords do not match!" })
        }
        else {
            this.setState({ retypeerror: "" })
        }
    }

    setFirstName(event) {
        this.setState({ error: "" });
        this.state.firsname = event.target.value

        this.setInputed(this.state.firsname, 0);

    }
    setLastName(event) {
        this.setState({ error: "" });
        this.state.lastName = event.target.value

        this.setInputed(this.state.lastName, 1);
    }
    setAddress(event) {
        this.setState({ error: "" });
        this.state.address = event.target.value

        this.setInputed(this.state.address, 4);
    }
    setCountry(event) {
        this.setState({ error: "" });
        this.state.country = event.target.value

        this.setInputed(this.state.country, 5);
    }
    setCity(event) {
        this.setState({ error: "" });
        this.state.city = event.target.value

        this.setInputed(this.state.city, 6);
    }
    setPostalCode(event) {
        this.setState({ error: "" });
        this.state.postalcode = event.target.value

        this.setInputed(this.state.postalcode, 7);
    }
    setPhoneNumber(event) {
        this.setState({ error: "" });
        this.state.phoneNumber = event.target.value

        this.setInputed(this.state.phoneNumber, 2);
    }
    
    setInputed(value, pos) {
        if ((value != "" || value != 0 || value != null) && this.myArray[pos] != 1) {
            this.myArray[pos] = 1
        }
        else if (value == "" || value == 0 || value == null) {
            this.myArray[pos] = 0
        }

        console.log(this.myArray);
    }

    validateForm() {
        var isEmpty = false;

        console.log(this.myArray);

        for (var i = 0; i < this.myArray.length; i++) {
            if (this.myArray[i] == 0) {
                isEmpty = true;
            }
        }

        if (isEmpty == true) {
            this.setState({error: "YOu have to fill in the complete form correctly!"})
        }
    }

    render() {


        return (

            <div className="rowNewAccount">
                <form className="form-signin">
                    <img className="login_icon" src={require('./img/9ners_Logo.svg')} alt="company_logo" width="90" height="90" />
                                       
                    <h1 className="h3 mb-3 font-weight-normal"> Create Account </h1>

                    <div className="inputContainer">
                        First Name
                        <input type="email" ref={elem => (this.firstNameInput = elem)} onChange={this.setFirstName} id="memberfirstname" className="form-control" placeholder="" required autoFocus />

                        Last Name
                        <input type="email" ref={elem => (this.lastNameInput = elem)} onChange={this.setLastName} id="memberfirstname" className="form-control" placeholder="" required  />
                    </div>

                    Email
                    <input type="email" ref={elem => (this.emailInput = elem)} onChange={this.setEmail} id="memberEmail" className="form-control" placeholder="" required />

                   Phone Number
                    <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  ref={elem => (this.phoneNumberInput = elem)} onChange={this.setPhoneNumber} id="memberphone" className="form-control" placeholder="" required />


                    <h2 className="h3 mb-3 font-weight-normal"> Address Information </h2>

                    <br />

                   Address
                    <input type="email" ref={elem => (this.addressInput = elem)} onChange={this.setAddress} id="memberAddress" className="form-control" placeholder="" required />

                    <br />

                    Country
                    <input type="email" ref={elem => (this.countryInput = elem)} onChange={this.setCountry} id="memberCountry" className="form-control" placeholder="" required />

                    <br />

                    City
                    <input type="email" ref={elem => (this.cityInput = elem)} onChange={this.setCountry} id="memberCity" className="form-control" placeholder="" required />

                    <br />

                    Postal Code
                    <input type="email" ref={elem => (this.postcodeInput = elem)} onChange={this.setPostalCode} id="memberpostal" className="form-control" placeholder="" required />


                    <br />
                    <br />

                    Password
                    <input type="password" ref={elem => (this.passwordInput = elem)} onChange={this.setPassword} id="employeepassword" className="form-control" placeholder="Password" required />
                    <br />
                    <br />
                   Re-Type Password
                    <input type="password" ref={elem => (this.retypepasswordInput = elem)} onChange={this.setRetypePassword} id="employeeretypepassword" className="form-control" placeholder="Password" required />
                    <br />

                    <p>{this.state.retypeerror}</p>

                    <Button onClick={this.validateForm} className="btn btn-lg btn-primary btn-block"> Create Account </Button>
                    <br />

             


                    <p id="errorMessage">{this.state.error} </p>

                    <p className="mt-5 mb-3">© 2019</p>
                </form>
            </div>

        );

    }
}
