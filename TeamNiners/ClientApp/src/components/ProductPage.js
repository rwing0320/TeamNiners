
import React, { Component } from 'react';
import { Glyphicon, Button, Accordion, Panel, Col, Grid, Row } from 'react-bootstrap';
import './css/ProductPage.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';
import Popup from "reactjs-popup";

export class ProductPage extends Component {
    displayName = ProductPage.name

    constructor(props) {
        super(props);
        this.state = { isTrue: false, pageOn: 1, cartCount: 0, gameTitle: "", gameCat: 0, gamePlat: 0, gamePrice: 0, gameDesc: "", isLoggedIn: true, btnDisabled: false, games: [], reviews: [], reviewID: 0, memberID: 0, gameID: 0, reviewContent: "", formOpen: false, memberUsername: "" };


        this.addToCart = this.addToCart.bind(this);
        this.getcartInfo = this.getcartInfo.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.addToWishList = this.addToWishList.bind(this);
        this.setCartInfo = this.setCartInfo.bind(this);
        this.getGames = this.getGames.bind(this);
        this.setCartCount = this.setCartCount.bind(this);
        this.getReviewList = this.getReviewList.bind(this);
        this.addNewReview = this.addNewReview.bind(this);
        this.getMemberUsername = this.getMemberUsername.bind(this);

        this.getProductInfo();
        this.getMemberId();
        this.getReviewList();

        this.openReviewForm = this.openReviewForm.bind(this);
        this.closeReviewForm = this.closeReviewForm.bind(this);
        this.onChangeReviewContent = this.onChangeReviewContent.bind(this);
      

    }

    getReviewList() {

        axios.get(webAddress + 'api/review/reviewlist', {

        })
            .then(res => {
                console.log(res.data);
                const reviews = res.data;
                this.setState({ reviews });

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });

    }

    

     async getMemberUsername() {

         await axios.get(webAddress + 'api/member/username/' + this.state.memberID, {
        })
             .then(res => {
                 this.setState({ memberUsername: res.data });
                this.addNewReview(res.data);
                console.log('username: ' + res.data);
              

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });


 
    }




    async addNewReview(username) {

        if (this.state.reviewContent != "") {
            await axios.post(webAddress + 'api/review/new', {
                MemberId: this.state.memberID,
                MemberUsername: username,
                GameId: this.state.gameID,
                ReviewContent: this.state.reviewContent
            })
                .then(res => {
                    console.log(res.data);
                    this.getReviewList();
                    this.setState({ formOpen: false });

                })
                .catch(function (error) {
                    //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                    console.log("this is the error: " + error);
                });

        } else {
            console.log('must have review content');
        }

    }

    openReviewForm() {
        this.setState({ formOpen: true });

    }
    closeReviewForm() {
        this.setState({ formOpen: false });
    }

    onChangeReviewContent(event) {
        this.state.reviewContent = event.target.value;
        console.log('Review content: ' + this.state.reviewContent + 'memberID: ' + this.state.memberID + ' gameID: ' + this.state.gameID);
    }


    setCartCount() {

        axios.get(webAddress + 'api/cart/getCartCount', {

        })
            .then(res => {
                console.log(res.data);
                if (res.data != 0) {
                    this.setState({ cartCount: res.data });
                }
                else {
                    this.setState({ cartCount: 0 });
                }

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });
    }


    getGames() {

        axios.get(webAddress + 'api/game/showgames_cart')
            .then(res => {
                const games = res.data;
                this.setState({ games });
                console.log(res.data);

            })
    }

    async getProductInfo() {
        await axios.get(webAddress + 'api/Game/GetGame', {

        })
            .then(res => {
                console.log(res.data[0].gameTitle);
                this.setState({ gameTitle: res.data[0].gameTitle, gamePrice: res.data[0].gamePrice, gameDesc: res.data[0].gameDescription, gameID: res.data[0].gameId });

                axios.post(webAddress + 'api/Game/GetGameCat', {
                    cat: res.data[0].gameCategory
                })
                    .then(res2 => {
                        console.log(res2.data);
                        this.setState({ gameCat: res2.data });
                        axios.post(webAddress + 'api/Game/GetGamePlat', {
                            plat: res.data[0].gamePlatform
                        })
                            .then(res3 => {
                                console.log(res3.data);
                                this.setState({ gamePlat: res3.data });

                            })
                            .catch(function (error) {
                                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                                console.log("this is the error: " + error);
                            });
                    })
                    .catch(function (error) {
                        //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                        console.log("this is the error: " + error);
                    });

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });

    }

    async getMemberId() {
        await axios.get(webAddress + 'api/members/getEmployeeId', {

        })
            .then(res => {
                console.log(res.data);
                if (res.data == 0) {
                    this.setState({ isLoggedIn: false, btnDisabled: true });
                } else {
                    this.setState({ btnDisabled: false });
                    this.setState({ memberID: res.data});
                    console.log('currentMemberID is : ' + this.state.memberID);
       
                    this.getGames();
                    this.setCartCount();
                }

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });
    }

    addToCart() {
        axios.post(webAddress + 'api/cart/saveCartItems', {

        })
            .then(res => {
                console.log(res.data);

                //this.setState({ cartCount: this.state.cartCount + 1 });
                this.getGames();
                this.setCartCount();
            })
            .catch(function (error) {
                //errormessage = "you have entered in incorrect credentails! please try again!"
                console.log("this is the error: " + error);
            });

    }

    addToWishList() {
        axios.post(webAddress + 'api/wishList/checkWishList', {

        })
            .then(res => {
                if (res.data.message == "") {
                    axios.post(webAddress + 'api/wishList/saveWishListItems', {

                    })
                        .then(res => {

                            console.log(res.data);
                            alert("Successfully added to wish list!");
                        })
                        .catch(function (error) {
                            //errormessage = "you have entered in incorrect credentails! please try again!"
                            console.log("this is the error: " + error);
                        });
                }
                else {
                    alert("Game already In Wish List!");
                }
                //console.log(res.data);
                //alert("Successfully added to wish list!");
            })
            .catch(function (error) {
                //errormessage = "you have entered in incorrect credentails! please try again!"
                console.log("this is the error: " + error);
            });



    }


    getcartInfo() {
        return <h4><Glyphicon glyph='shopping-cart' /> Cart <span className="badge">{this.state.cartCount}</span></h4>;
    }

    setCartInfo() {
        if (this.state.btnDisabled == false) {

            return <Accordion className="accordionPanel" >

                <Panel className="cartPanel" header={this.getcartInfo()} eventKey='1'>
                    <div className="scrollCart">
                        <table>
                            <tbody>

                                {this.state.games.map(game =>

                                    <tr key={game.cartLineId} className="myTableRow" >
                                        <td width="75%">
                                            <br />
                                            <div>
                                                <div>{game.title}</div>
                                                <div>Desccription: {game.description}</div>
                                                <div>Price: ${game.price}</div>
                                            </div>
                                        </td>

                                        <td width="25%">
                                            <br />
                                            <Button type="button" className="btn btn-small btn-warning btn-block" id="" onClick={() => this.deleteFromCartList(game.gameId)} >Remove</Button>
                                            <br />
                                        </td>

                                    </tr>


                                )}

                            </tbody>

                        </table>

                    </div>
                </Panel>

            </Accordion>

        }
        else {
            return ""
        }
    }


    async  deleteFromCartList(pid) {
        console.log("the productId for deleteFromWishList is " + pid)
        await axios.post(webAddress + 'api/cart/deleteCartItem', {
            gameId: pid
        })
            .then(res => {
                console.log(res.data);

                this.getGames();
                this.setCartCount();
                //this.props.changePage(5);

            })
            .catch(function (error) {
                //errorMessage = "You have entered in incorrect credentails! Please try Again!"
                console.log("this is the error: " + error);
            });
    }


    render() {

        return (
            <div className="productPageDiv">

                <Grid fluid>
                    <Row id="topRow">
                        <Col md={6} id="gameImageColumn">
                            <div id="gameImageDiv">
                                <img id="product_gameImage" src={videoGame} />
                            </div>
                        </Col>

                        <Col md={6} id="gameInfoColumn">
                        
                            <Row>

                                <div className="productForm">

                                    <div className="gameInfoElement">

                                    <div id="gameInfo">

                                            <Row>
                                                <div id="rowLabels">

                                                <Col sm={3}>
                                    <label for="gameTitle">Title:</label>

                                                    </Col>

                                                <Col sm={3}>
                                                        <label for="gamePlatform">Platform:</label>
                                                    
                                                </Col>


                                                <Col sm={3}>
                                                        <label for="gameCategory">Category:</label>

                                                    </Col>
                                                </div>
                                            </Row>

                                            <Row>
                                                <div id="rowInfo">
                                            <Col sm={3}>

                                                    
                                                <input type="text" class="form-control" id="gameTitle" placeholder={this.state.gameTitle} readOnly />
                                            </Col>

                                            <Col sm={3}>
                                                    
                                                <input type="text" class="form-control" id="gamePlatform" placeholder={this.state.gamePlat} readOnly />
                                            </Col>
                                            <Col sm={3}>
                                                <input type="text" class="form-control" id="gameCategory" placeholder={this.state.gameCat} readOnly />
                                                    </Col>
                                                </div>
                                            </Row>
                                                        </div>
                            </div>

                                <form className="">
                                    <h3 className="ProductPrice" align="left">Price: ${this.state.gamePrice}</h3>
                                    <br />

                                    <Button className="btn btn-lg btn-info btn-block" disabled={this.state.btnDisabled} onClick={this.addToCart}> Add To Cart </Button>


                                    <Button className="btn btn-lg btn-success btn-block" disabled={this.state.btnDisabled} onClick={this.addToWishList}> Add To Favorites </Button>

                                    <div className="productPageCart"  >

                                        {this.setCartInfo()}




                                    </div>;

                                    </form>
                            </div>

                                </Row>

                        </Col>

                    </Row>

                    <Row>

                        <Col xl={12} id="gameReviewsColumn">

                            <div id="gameReviewsDiv">

                                <h3 className="DescriptionTitle">Description</h3>
                                <p className="Description">{this.state.gameDesc}</p>

                                <Accordion>
                                    <Panel header="Reviews" eventKey='1'>
                                        <span id="newReviewButton" className="glyphicon glyphicon-comment fa-lg" onClick={this.openReviewForm} aria-hidden="true"></span>
                                        

                                        <Popup
                                            open={this.state.formOpen}
                                            onClose={this.closeReviewForm} id="reviewPopup">
                                            <Grid fluid>
                                                <Row>
                                                    <Col xl={12} id="newReviewColumn">
                                                        <div id="newReviewDiv">
                                                            <label for="ReviewLabel">Review:</label>
                                                            <textarea type="text" onChange={this.onChangeReviewContent} class="form-control" id="reviewContentInput" required autoFocus />
                                                            <button class="btn btn-info" onClick={this.getMemberUsername}>Submit</button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </Popup>

                                        {this.state.reviews.map(review =>

                                            <Grid fluid>
                                            <div key={review.reviewID} id="reviewItem">

                                                
                                                    <Row>
                                                        <Col md={12}>
                                                            <h2>User: {review.memberUsername}</h2>
                                                            <h4>{review.reviewContent}</h4>
                                                        </Col>
                                                    </Row>
                                                
                                            </div>
                                            </Grid>
                                        )}

                                    </Panel>
                                </Accordion>
                            </div>

                        </Col>
                    </Row>

                </Grid>

                
               



            </div>
                );
            }
        }
