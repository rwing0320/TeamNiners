import React, { Component } from 'react';
import { Glyphicon, Button, Accordion, Panel } from 'react-bootstrap';
import './css/wishList.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';


export class Cart extends Component {
    displayName = Cart.name

    constructor(props) {
        super(props);
        this.state = { games: [] };

        this.getGames = this.getGames.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.gotToProductPage = this.gotToProductPage.bind(this);

        this.getGames();

    }

    getGames() {

        axios.get(webAddress + '/api/game/showgames_cart')
            .then(res => {
                const games = res.data;
                this.setState({ games });
                console.log(res.data);

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
            productId: pid
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

    render() {

        return (
            <div className="cartPage">
                <h1 id=""><b>Cart</b></h1>

                <table>
                    <tbody>
                        {this.state.games.map(game =>
                            <tr key={game.gameId} className="myTableRow" >
                                <td width="65%">
                                    <br />
                                    <img id="gameImage" src={videoGame} />
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
                <div class="buttons">
                    <button className="btn btn-small btn-danger btn-block">Clear Cart</button>
                    <button className="btn btn-small btn-success btn-block">Purchase Cart</button>
                    </div>
            </div>
        );
    }
}
