import React, { Component } from 'react';
import { Glyphicon, Button, Accordion, Panel, Grid, Row, Col } from 'react-bootstrap';
import './css/wishList.css';
import './css/cart.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';
import Popup from "reactjs-popup";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export class Cart extends Component {
    displayName = Cart.name

    constructor(props) {
        super(props);
        this.state = { games: [], userInfo: [], count: 0, total: 0, showCheckoutForm: false, showCheckoutConfirmationForm: false, ccName: "", ccNum: "", ccCVC: "", ccExp: "", comboName: "", validationErrorList: "" };

        this.getGames = this.getGames.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.gotToProductPage = this.gotToProductPage.bind(this);
        this.cartCount = this.cartCount.bind(this);
        this.purchaseCart = this.purchaseCart.bind(this);
        this.openOrderForm = this.openOrderForm.bind(this);
        this.closeOrderForm = this.closeOrderForm.bind(this);
        this.orderSubmitted = this.orderSubmitted.bind(this);
        this.openOrderConfirmationForm = this.openOrderConfirmationForm.bind(this);
        this.closeOrderConfirmationForm = this.closeOrderConfirmationForm.bind(this);
        this.finishOrder = this.finishOrder.bind(this);
        this.onChangeNAME = this.onChangeNAME.bind(this);
        this.onChangeNUM = this.onChangeNUM.bind(this);
        this.onChangeCVC = this.onChangeCVC.bind(this);
        this.onChangeEXP = this.onChangeEXP.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.prepareCCNumDisplay = this.prepareCCNumDisplay.bind(this);
        this.addDollarSign_Total = this.addDollarSign_Total.bind(this);
        this.concatFirstName_LastName = this.concatFirstName_LastName.bind(this);
        this.createReceipt = this.createReceipt.bind(this);
        this.creditCardValidation = this.creditCardValidation.bind(this);

        this.getGames();
        this.errorMessage = null;

    }

    createReceipt() {
        const doc = new jsPDF();
        doc.text(87, 10, 'Order Receipt');
        doc.autoTable({ html: '.hiddenTable' });
        let finalY = doc.lastAutoTable.finalY;
        //doc.text(options.margin.left, doc.autoTable.previous.finalY + 30, "Total: " + document.getElementById("TotalInput").value);
        doc.text(15, doc.autoTable.previous.finalY + 20, "Total: " + document.getElementById("TotalInput").value);
        doc.text(15, doc.autoTable.previous.finalY + 25, "Order For: " + this.state.comboName);

        doc.text(15, doc.autoTable.previous.finalY + 30, "Credit Card Information");
        doc.text(15, doc.autoTable.previous.finalY + 35, "Name Holder: " + this.state.ccName);
        doc.text(15, doc.autoTable.previous.finalY + 40, "Credit Card Number: " + this.state.ccNum);
        //doc.text(5, finalY + 25, "Total: " + document.getElementById("TotalInput").value);
        //doc.text(5, finalY + 25, "Your order will arrive in the next 5-7 business days");
        doc.save('GameDetail.pdf');
    }

    purchaseCart() {

        this.setState({ showCheckoutForm: true });

    }

    openOrderForm() {
        this.setState({ showCheckoutForm: true });

    }

    closeOrderForm() {
        this.setState({ showCheckoutForm: false });
    }
    orderSubmitted() {

        var validationFailed = this.creditCardValidation();

        if (!validationFailed) {

            this.closeOrderForm();

            this.openOrderConfirmationForm();

        } else {
            //console.log("Validation Error List in in submission before alert: " + this.state.validationErrorList);
            alert("Validation failed for credit card input. Please fix these errors: \n" + this.errorMessage);

        }
    }

    creditCardValidation() {

        var validationFail = false;
        this.errorMessage = "";

        if (this.state.ccName == "") {
            validationFail = true;
            this.errorMessage += "Cardholder name is empty. \n";
        }

        if (this.state.ccNum == "") {
            validationFail = true;
            this.errorMessage += "Credit Card Number is empty. \n";
        }

        if (this.state.ccCVC == "") {
            validationFail = true;
            this.errorMessage += "Credit Card CVC is empty. \n";
        }

        if (this.state.ccExp == "") {
            validationFail = true;
            this.errorMessage += "Credit Card Expiry is empty. \n";
        }



        if (/[a-z]/i.test(this.state.ccNum)) {
            validationFail = true;
            this.errorMessage += "Credit Card Number contains incorrect characters. Please use only numbers. \n";
        }

        if (/[a-z]/i.test(this.state.ccCVC)) {
            validationFail = true;
            this.errorMessage += "Credit Card CVC contains incorrect characters. Please use only numbers. \n";
        }

        if (/[a-z]/i.test(this.state.ccExp)) {
            validationFail = true;
            this.errorMessage += "Credit Card Expiry contains incorrect characters. Please use only numbers. \n";
        }


        return validationFail;

    }

    openOrderConfirmationForm() {

        this.setState({ showCheckoutConfirmationForm: true });
        this.getUserInfo();
        this.prepareCCNumDisplay();

    }

    closeOrderConfirmationForm() {
        this.setState({ showCheckoutConfirmationForm: false });
    }

    prepareCCNumDisplay() {

        var lastFourDigits = this.state.ccNum.substring(12, 16);

        var displayNum = "************" + lastFourDigits;

        this.setState({ ccNum: displayNum });

    }

    addDollarSign_Total() {

        var total = "$";

        var returnVal = total + this.state.total;

        this.setState({ total: returnVal });

    }

    concatFirstName_LastName() {

        console.log('greihjhreihrj' + this.state.userInfo.firstName);
        var nameConcat = this.state.userInfo.firstName + " " + this.state.userInfo.lastName;

        this.setState({ comboName: nameConcat });
    }

    finishOrder() {
        this.closeOrderConfirmationForm();


        this.clearCart();

        this.props.changePage(3);
    }

    getUserInfo() {

        axios.get(webAddress + 'api/MemberAccount/GetMember')
            .then(res => {
                const userInfo = res.data;
                this.setState({ userInfo });
                console.log('test res.data.field' + res.data.lastName);
                this.concatFirstName_LastName();
            })

    }

    onChangeNAME(event) {
        this.state.ccName = event.target.value;
    }

    onChangeNUM(event) {
        this.state.ccNum = event.target.value;
    }

    onChangeCVC(event) {
        this.state.ccCVC = event.target.value;
    }

    onChangeEXP(event) {
        this.state.ccExp = event.target.value;
    }

    cartCount() {
        axios.get(webAddress + '/api/cart/getCartCount')
            
            .then(res => {
                var cartCount = res.data;
                this.setState({ count: cartCount })
                console.log(this.state.count);
               
            })
    }



    getGames() {

        axios.get(webAddress + '/api/game/showgames_cart')
            .then(res => {
                const games = res.data;
                var i;
                var total = 0;
                //this.state.games.map(game =>
                //    total += game.price;

                //    );
                console.log("length of array is :" + res.data.length)
                for (i = 0; i < res.data.length; i++) {
                    total = total + res.data[i].price;
                    console.log("price is :" + res.data[i].price)
                }
                this.setState({ games, total });
                console.log(res.data);
                this.cartCount();
                this.addDollarSign_Total();

            })
    }

    async  gotToProductPage(productId) {
        console.log("the productId for productPage is " + productId)
        await axios.post(webAddress + 'api/product/productID', {
            GameId: productId
        })
            .then(res => {
                console.log(res);

                this.props.changePage(5);

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });
    }

    async  deleteFromCart(pid) {
        console.log("the productId for deleteFromCart is " + pid)
        await axios.post(webAddress + 'api/cart/deleteCartItem', {
            gameId: pid
        })
            .then(res => {
                console.log(res.data);

                this.getGames();
                //this.props.changePage(5);

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });
    }

    clearCart() {
        axios.post(webAddress + 'api/cart/deleteEntireCartItem/' + 1)
            .then(res => {
                this.getGames();
                console.log("Cart Cleared" + res.data);

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });

    }

    render() {

        if (this.state.count === 0) {
            return <div> <h1>Cart</h1> <h2>Your cart is empty, please go to the home page and fill it up :)</h2> </div>
        }
        else {
            return (
                <div className="cartPage">
                    <h1 id=""><b>Cart</b></h1>
                    <table className="hiddenTable">
                        <thead >
                            <tr>
                                <th>Game Name</th>
                                 <th>Price</th>
                            </tr>
                        </thead>

                        <tbody >

                            {this.state.games.map(gameInfo =>
                                <tr key={gameInfo.id}>
                                    <th scope="col">{gameInfo.title}</th>
                                    <td>${gameInfo.price}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    <table className="cartInfoTable">
                        <tbody>
                            {this.state.games.map(game =>
                                <tr key={game.gameId} className="myTableRow" >
                                    <td width="65%">
                                        <br />
                                        <img id="wishlist_gameImage" src={videoGame} />
                                        <div id="gameInfoDiv">
                                            <div>{game.title}</div>
                                            <div>Description: {game.description}</div>
                                            <div>Price: ${game.price}</div>
                                        </div>
                                    </td>

                                    <td width="25%">
                                        <br />
                                        <Button type="button" className="btn btn-small btn-info btn-block" id="" onClick={() => this.gotToProductPage(game.gameId)}>Go To Product</Button>
                                        <Button type="button" className="btn btn-small btn-warning btn-block" id="" onClick={() => this.deleteFromCart(game.gameId)}>Remove From Cart</Button>
                                        <br />
                                    </td>

                                </tr>


                            )}

                        </tbody>

                    </table>

                    <div><b>Total: {this.state.total}</b></div>
                    <div className="buttons">

                    <Popup
                        open={this.state.showCheckoutForm}
                            onClose={this.closeOrderForm} id="purchaseForm">
                            <Accordion>
                                <Panel>
                        <Grid fluid>

                            <Row>
                                <Col xl={12}>
                                    <div id="header">
                                        <h2>Order Checkout</h2>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={12} id="CCInfoCol">
                                    <div id="CCInfoDiv">

                                            <label for="CCNameInput">Card Holder Name:</label>
                                            <input type="text" class="form-control" onChange={this.onChangeNAME} id="ccCardholderName" required />

                                            <label for="CCNumInput">Credit Card Number:</label>
                                            <input type="text" class="form-control" onChange={this.onChangeNUM} maxLength="16" id="ccNum" required />

                                        <label for="CVCInput">CVC:</label>
                                            <input type="text" class="form-control" onChange={this.onChangeCVC} maxLength="3" id="ccCVC" required />

                                        <label for="CCExpiryInput">Expiry Date: (MMYY)</label>
                                            <input type="text" class="form-control" onChange={this.onChangeEXP} maxLength="4" id="ccExpiry" required />

                                        <br />

                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xl={12}>
                                    <div id="buttonDiv">
                                        <button class="btn btn-info" onClick={this.orderSubmitted}>Submit</button>
                                        </div>
                                </Col>
                            </Row>
                                    </Grid>
                                </Panel>
                            </Accordion>
                    </Popup>


                    <Popup
                        open={this.state.showCheckoutConfirmationForm}
                            onClose={this.closeOrderConfirmationForm} id="confirmationForm">
                            <Accordion>
                                <Panel>
                            <Grid fluid>
                               
                            <Row>
                                <Col xl={12}>
                                    <div id="header">
                                        <h1>Order Confirmation</h1>
                                    </div>
                                </Col>
                            </Row>

                                <Row>
                                    <Col xl={12}>
                                        <div id="CustomerInfoDiv">

                                                    <label for="NameInput">Name:</label>
                                                    <input type="text" class="form-control" value={this.state.comboName} id="NameInput" disabled />

                                        <label for="AddressInput">Address:</label>
                                        <input type="text" class="form-control" value={this.state.userInfo.memberAddress} id="AddressInput" disabled />

                                        <label for="CityInput">City:</label>
                                        <input type="text" class="form-control" value={this.state.userInfo.memberCity} id="CityInput" disabled />

                                        <label for="CountryInput">Country:</label>
                                        <input type="text" class="form-control" value={this.state.userInfo.memberCountry} id="CountryInput" disabled />

                                        <label for="PostalCodeInput">Postal Code:</label>
                                        <input type="text" class="form-control" value={this.state.userInfo.memberPostalCode} id="PostalCodeInput" disabled />

                                        </div>



                                    </Col>
                                </Row>

                                <br />

                            <Row>
                                <Col xl={12} id="CCInfoCol">
                                        <div id="CCInfoDiv">

                                            <label for="CCNameInput">Card Holder Name:</label>
                                            <input type="text" class="form-control" value={this.state.ccName} id="ccCardholderName" disabled />

                                            <label for="CCNumInput">Credit Card Number:</label>
                                            <input type="text" class="form-control" value={this.state.ccNum} id="ccNum" disabled />

                                            <label for="CVCInput">CVC:</label>
                                            <input type="text" class="form-control" value={this.state.ccCVC} id="ccCVC" disabled />

                                            <label for="CCExpiryInput">Expiry Date: (MMYY)</label>
                                            <input type="text" class="form-control" value={this.state.ccExp} id="ccExpiry" disabled />

                                        <br />

                                    </div>
                                </Col>
                            </Row>

                                <Row>
                                    <Col xl={12}>
                                        <div id="TotalDiv">
                                        <label for="TotalDisplay">Total: ($)</label>
                                            <input type="text" class="form-control" value={this.state.total} id="TotalInput" disabled />
                                        </div>
                                    </Col>
                                </Row>

                            <Row>
                                <Col xl={12}>
                                                <div id="buttonDiv">
                                                    <button class="btn btn-warning" onClick={this.finishOrder}>Close</button> <button className="btn btn-succes" onClick={this.createReceipt}>Print Receipt</button>
                                    </div>
                                </Col>
                            </Row>
                                    </Grid>
                                </Panel>
                            </Accordion>
                    </Popup>


                    <div class="buttons">
                        <button className="btn btn-small btn-danger btn-block" onClick={() => this.clearCart()}>Clear Cart</button>
                        <button onClick={this.purchaseCart} className="btn btn-small btn-success btn-block">Purchase Cart</button>
                    </div>
                    </div>
                </div>
            );
        }
    }
}
