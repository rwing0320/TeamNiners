import React, { Component } from 'react';
import { Glyphicon, Button, Accordion, Panel, Grid, Row, Col } from 'react-bootstrap';
import './css/wishList.css';
import './css/cart.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';
import Popup from "reactjs-popup";


export class Cart extends Component {
    displayName = Cart.name

    constructor(props) {
        super(props);
        this.state = { games: [], userInfo: [], count: 0, total: 0, showCheckoutForm: false, showCheckoutConfirmationForm: false, ccName: "", ccNum: "", ccCVC: "", ccExp: "" };

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

        this.getGames();

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

        this.closeOrderForm();

        this.openOrderConfirmationForm();

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

    finishOrder() {
        this.closeOrderConfirmationForm();

        //add logic to redirect to home page and clear cart
    }

    getUserInfo() {

        axios.get(webAddress + 'api/MemberAccount/GetMember')
            .then(res => {
                const userInfo = res.data;
                this.setState({ userInfo });
                console.log('test res.data.field' + res.data.lastName);
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
                alert("Cart has been cleared");
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
                    <table>
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

                    <div><b>Total: ${this.state.total}</b></div>
                    <div className="buttons">

                    <Popup
                        open={this.state.showCheckoutForm}
                        onClose={this.closeOrderForm} id="purchaseForm">
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
                    </Popup>


                    <Popup
                        open={this.state.showCheckoutConfirmationForm}
                        onClose={this.closeOrderConfirmationForm} id="confirmationForm">
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

                                        <label for="FirstNameInput">First Name:</label>
                                        <input type="text" class="form-control" value={this.state.userInfo.firstName} id="FirstNameInput" disabled />

                                        <label for="LastNameInput">Last Name:</label>
                                        <input type="text" class="form-control" value={this.state.userInfo.lastName} id="LastNameInput" disabled />

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
                                        <button class="btn btn-warning" onClick={this.finishOrder}>Close</button>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
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
