import React, { Component } from 'react';
import { Glyphicon, Button, Accordion, Panel } from 'react-bootstrap';
import './css/wishList.css';
import videoGame from './img/Video_Game.jpg';
import axios from 'axios';
import { webAddress } from './reference/reference';

export class WishList extends Component {
    displayName = WishList.name

    constructor(props) {
        super(props);
        this.state = { games: []};

        this.getGames = this.getGames.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.deleteFromWishList = this.deleteFromWishList.bind(this);
        this.gotToProductPage = this.gotToProductPage.bind(this);

        this.getGames();
        
    }

    getGames() {

        axios.get(webAddress + 'api/game/showgames_wishList')
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

    addToCart(productId) {
        console.log("the productId for addToCart is " + productId)
    }

   async  deleteFromWishList(pid) {
        console.log("the productId for deleteFromWishList is " + pid)
        await axios.delete(webAddress + 'api/wishList/deleteWishItem', {
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
            <div className="productPageDiv">
                <h1 id=""><b>Wish List</b></h1>

                <table>
                    <tbody>
                        {this.state.games.map(game =>
                            <tr key={game.gameId} className="myTableRow" >
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
                                    <Button type="button" className="btn btn-small btn-info btn-block" id="" onClick={() => this.gotToProductPage(game.gameId)}>Go To Product</Button>
                                    <Button type="button" className="btn btn-small btn-success btn-block" id="" onClick={() => this.addToCart(game.gameId)}>Add To Cart</Button>
                                    <Button type="button" className="btn btn-small btn-warning btn-block" id="" onClick={() => this.deleteFromWishList(game.gameId)}>Remove From WishList</Button>
                                    <br/>
                                </td>
                                
                            </tr>
                          

                        )}

                    </tbody>
                 
                </table>
            </div>
        );
    }
}
