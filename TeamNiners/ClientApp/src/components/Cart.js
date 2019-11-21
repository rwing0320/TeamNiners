import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './css/wishList.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';


export class Cart extends Component {
    displayName = Cart.name

    constructor(props) {
        super(props);
        this.state = { games: [], count: 0, total: 0 };

        this.getGames = this.getGames.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.gotToProductPage = this.gotToProductPage.bind(this);
        this.cartCount = this.cartCount.bind(this);

        this.getGames();

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

    getPrice(price) {
        this.setState({ total: this.state.total + price })
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
                        <button className="btn btn-small btn-danger btn-block" onClick={() => this.clearCart()}>Clear Cart</button>
                        <button className="btn btn-small btn-success btn-block">Purchase Cart</button>
                    </div>
                </div>
            );
        }
    }
}
