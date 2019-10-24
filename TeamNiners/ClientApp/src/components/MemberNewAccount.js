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
import { MemberNav } from './MemberNav';
import { webAddress } from './reference/reference';


export class MemberNewAccount extends Component {
    displayName = MemberNewAccount.name;

    constructor(props) {
        super(props);
        this.state = { firsname: "", lastName: "", phoneNumber: "", email: "", address: "", country: "", city: "", postalcode: "", password: "", retypedpassword: "hello", error: "", retypeerror: "", postalCodeError: "", phoneNumberError: "", emailError: "", data1: "", data2: "", newAccountSuccessful: false };




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

        this.firstNameString = "";

        this.checkValid = this.checkValid.bind(this);

        this.myArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    }

    checkValid() {
        this.props.loginUser();
        this.props.changePage(3, "Peter P");
    }


    setEmail(event) {
        this.setState({ error: "" });
        this.state.email = event.target.value

        let emailMatch = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

        if (this.state.email == "") {
            this.setState({ emailError: "" });
            this.setInputed("", 3);
        }

        else if (emailMatch == null) {
            this.setInputed("", 3);
            this.setState({ emailError: "Please enter a valid email" });
        }
        else {
            this.setState({ emailError: "" });
            this.setInputed(this.state.email, 3);
        }

        
    }

    setPassword(event) {
        this.setState({ error: "" });
        this.state.password = event.target.value

        this.setInputed(this.state.password, 8);
    }

    setRetypePassword(event) {
        this.setState({ error: "" });
        this.state.retypedpassword = event.target.value

       

        if (this.state.retypedpassword != this.state.password && (this.state.password != "" && this.state.retypedpassword!= "")) {
            this.setState({ retypeerror: "The passwords do not match!" })
             this.setInputed("", 9);
        }
        else {
            this.setInputed(this.state.retypedpassword, 9);
            this.setState({ retypeerror: "" })
        }
    }

    setFirstName(event) {
        this.setState({ error: "" });
        this.state.firstname = event.target.value

        this.setInputed(this.state.firstname, 0);
       

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

        var postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        var match = postalRegex.test(this.state.postalcode);

        if (match && this.state.postalcode != "") {
            this.setState({ postalCodeError: "" })
            this.setInputed(this.state.postalcode, 7);
        }
        else if (this.state.postalcode != "") {
            this.setState({ postalCodeError: "This is not a valid Postal Code!" })
            this.setInputed("", 7);
        }
        else {
            this.setState({ postalCodeError: "" })
            this.setInputed("", 7);
        }


       
    }
    setPhoneNumber(event) {
        this.setState({ error: "" });
        this.state.phoneNumber = event.target.value

        var phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        var match = phoneNumberRegex.test(this.state.phoneNumber);

        if (match && this.state.phoneNumber != "") {
            this.setState({ phoneNumberError: "" });
            this.setInputed(this.state.phoneNumber, 2);

        }
        else if (this.state.phoneNumber != "") {
            this.setState({ phoneNumberError: "Please Fill In a Valid Phone Number" });
            this.setInputed("", 2);
        }
        else {
            this.setState({ phoneNumberError: "" });
            this.setInputed("", 2);
        }

       
    }

 

    setInputed(value, pos) {
        if ((value != "") && this.myArray[pos] != 1) {
            this.myArray[pos] = 1
        }
        else if (value == "") {
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
            this.setState({ error: "You have to fill in the complete form correctly!" })
        }
        else {
            this.saveNewAccount();
        }
    }

    async saveNewAccount() {
        var success = true;
        var memberPassword = this.state.password;

        axios.post(webAddress + 'api/MemberAccount', {
            FirstName: this.state.firsname,
            LastName: this.state.lastName,
            MemberAddress: this.state.address,
            MemberCity: this.state.city,
            MemberCountry: this.state.country,
            MemberPostalCode: this.state.postalcode,
            MemberPhoneNumber: this.state.phoneNumber,
            MemberEmail: this.state.email
        }).then(function (response) {
            var memberId = response.data.memberId;
            var memberEmail = response.data.memberEmail;
            axios.post(webAddress + 'api/MemberAccount/AddMemberLogin', {
                MemberId: memberId,
                MemberUsername: memberEmail,
                MemberPassword: memberPassword

            })
                .then(function (response) {
                    console.log(response);
                    //successFlag = true;
                    console.log(response.data);
                    //businessName = response.data.businessName;

                })
                .catch(function (error) {
                    success = false;
                    console.log("this is the error: " + error);
                });
        });

        if (success == true) {
            this.setState({ newAccountSuccessful: true });
        }
    }



    changeLogin() {

        
        if (this.state.newAccountSuccessful) {
            console.log(this.state.firstname);
            //return <Redirect to='/member' />
            try {
                this.props.changePage(3, this.state.firstname + " " + this.state.lastName.charAt(0), true);
                this.props.loginUser();
               
            } catch (e) {
                console.log("problem with creating account")
            }

          
        }
    }

  

    render() {


        return (

            <div className="rowNewAccount">

             
                {this.changeLogin()}
                <form className="form-signin">
                    <img className="login_icon" src={require('./img/9ners_Logo.svg')} alt="company_logo" width="90" height="90" />
                                       
                    <h1 className="h3 mb-3 font-weight-normal"> Create Account </h1>

                    <div className="inputContainer">
                        First Name
                        <input type="email" ref={elem => (this.firstNameInput = elem)} onChange={this.setFirstName} id="memberfirstname" className="form-control" placeholder="" required autoFocus />

                        Last Name
                        <input type="email" ref={elem => (this.lastNameInput = elem)} onChange={this.setLastName} id="memberfirstname" className="form-control" placeholder="" required  />
                        <p className="passwordError">{this.state.emailError}</p>
                    </div>

                    Email
                    <input type="email" ref={elem => (this.emailInput = elem)} onChange={this.setEmail} id="memberEmail" className="form-control" placeholder="" required />

                   Phone Number
                    <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  ref={elem => (this.phoneNumberInput = elem)} onChange={this.setPhoneNumber} id="memberphone" className="form-control" placeholder="" required />
                    <p className="passwordError">{this.state.phoneNumberError}</p>

                    <h2 className="h3 mb-3 font-weight-normal"> Address Information </h2>

                    <br />

                   Address
                    <input type="email" ref={elem => (this.addressInput = elem)} onChange={this.setAddress} id="memberAddress" className="form-control" placeholder="" required />

                    <br />

                    Country
                    <input type="email" ref={elem => (this.countryInput = elem)} onChange={this.setCountry} id="memberCountry" className="form-control" placeholder="" required />

                    <br />

                    City
                    <input type="email" ref={elem => (this.cityInput = elem)} onChange={this.setCity} id="memberCity" className="form-control" placeholder="" required />

                    <br />

                    Postal Code
                    <input type="email" ref={elem => (this.postcodeInput = elem)} onChange={this.setPostalCode} id="memberpostal" className="form-control" placeholder="" required />
                    <p className="passwordError">{this.state.postalCodeError}</p>

                    <br />
                    <br />

                    Password
                    <input type="password" ref={elem => (this.passwordInput = elem)} onChange={this.setPassword} id="employeepassword" className="form-control" placeholder="Password" required />
                    <br />
                    <br />
                   Re-Type Password
                    <input type="password" ref={elem => (this.retypepasswordInput = elem)} onChange={this.setRetypePassword} id="employeeretypepassword" className="form-control" placeholder="Password" required />
                    <br />

                    <p className="passwordError">{this.state.retypeerror}</p>

                    <Button onClick={this.validateForm} className="btn btn-lg btn-primary btn-block"> Create Account </Button>
                    <br />

                    <Button onClick={() => this.changeLogin} className="btn btn-lg btn-primary btn-block"> CALL FUNCTION </Button>
             


                    <p id="errorMessage">{this.state.error} </p>

                    <p className="mt-5 mb-3">© 2019</p>
                </form>
            </div>

        );

    }
}
