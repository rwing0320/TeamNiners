import React, { Component } from 'react';
import { Glyphicon, Button, Accordion, Panel } from 'react-bootstrap';
import './css/ProductPage.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';

export class ProductPage extends Component {
    displayName = ProductPage.name

    constructor(props) {
        super(props);
        this.state = { isTrue: false, pageOn: 1, cartCount: 0, gameTitle: "", gameCat: 0, gamePlat: 0, gamePrice: 0, gameDesc: "", isLoggedIn: true, btnDisabled: false, games: []};

      
        this.addToCart = this.addToCart.bind(this);
        this.getcartInfo = this.getcartInfo.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.addToWishList = this.addToWishList.bind(this);
        this.setCartInfo = this.setCartInfo.bind(this);
        this.getGames = this.getGames.bind(this);
         this.setCartCount = this.setCartCount.bind(this);

        this.getProductInfo();
        this.getMemberId();


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
                this.setState({ gameTitle: res.data[0].gameTitle, gamePrice: res.data[0].gamePrice, gameDesc: res.data[0].gameDescription });


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


                <table className="table-borderless purchaseTable">
                    <tbody>
                        <tr >
                            <td width="30%">
                                <img src={videoGame} />
                            </td>

                            <td width="50% ">
                                <div className="gameInfoElement">
                                    <h2 className="Title">{this.state.gameTitle}</h2>
                                    <h2 className="Platform">Platform: {this.state.gamePlat}</h2>
                                    <h2 className="Category">Category: {this.state.gameCat}</h2>
                                </div>
                            </td>

                            <td width="20%">
                                <div className="productForm">
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
                            </td>



                        </tr>
                        <tr className="description">
                            <td colSpan="3" >
                                <h3 className="DescriptionTitle">Description</h3>
                                <p className="Description">{this.state.gameDesc}</p>
                            </td>
                        </tr>
                    </tbody>

                </table>

                <Accordion>
                    <Panel header="Reviews" eventKey='1'>
                        There are no reviews available!
                </Panel>
                </Accordion>


            </div>
        );
    }
}
