import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProductList(props) {


    // let items = [
    //     {
    //         id:1,   
    //         imageUrl: "/assets/images/iphone-8-back.jpg",
    //         desc: "IPhone 8(White) in excellent condition",
    //         price: 35000,
    //     },
    //     {
    //         id:2,
    //         imageUrl: "/assets/images/phone2.jpg",
    //         desc: "Samsung Galaxy S8(Black), metal body, great condition",
    //         price: 25000,
    //     },
    //     {
    //         id:3,
    //         imageUrl: "/assets/images/iphone-8-back.jpg",
    //         desc: "Crack the coding interview by Gayle Laakmann McDowell 6th Edition, Perfect Condition",
    //         price: 350,
    //     },
    // ];

    // enable when ratings are added for users
                    // .filter((val) => {
                    //     if(props.filterRatings === 0)
                    //         return val;
                    //     else {
                    //         console.log(sellerRating);
                    //         Axios.get('http://localhost:5000/getUser', {username: val.owner})
                    //         .then((res) => {
                    //             setsellerRating(res.data.result.rating);
                    //         })
                    //         console.log(sellerRating);
                    //         if(sellerRating >= props.filterRatings)
                    //             return val;
                    //     }
                    // })
                    // Enable when location is added for users
                    // .filter((val) => {
                    //     if(props.filterLocation.size === 0)
                    //         return val;
                    //     else {
                    //         // Axios.get('http://localhost:5000/getUser', {username: val.owner})
                    //         // .then((res) => {
                    //         //     setsellerLocation(res.data.result.location);
                    //         // })
                    //         console.log(sellerLocation);
                    //         // if(props.filterLocation.has(sellerLocation))
                    //             return val;
                    //     }
                    // })
    console.log(props.searchText);
    console.log(props.filterPrice);
    console.log(props.filterRatings);
    console.log(props.filterLocation);

    useEffect(() => {
        getProductsfromDB();
    }, [],
    );
    let [items, setItems] = useState([]);
    let [sellerRating, setsellerRating] = useState(0);
    let [sellerLocation, setsellerLocation] = useState("");


    function getProductsfromDB() {
        //window.location.reload();
        Axios.get('http://localhost:5000/products/getProducts', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
            .then((res) => {
                let returned_items = res.data.result;
                setItems(returned_items);
                console.log(returned_items);
            })

    }

    // function productPage(id){
    //     const params = new URLSearchParams();
    //     params.append("id",id);
    //     history.push({pathname: "/product",search: params.toString()});
    // }


    //onClick={productPage(item.id)}
    console.log(props.category);

    return (
        <div>
            <div className="album bg-light">
                <div className="container text-decoration-none ">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                    {items
                    .filter((val) => {
                        if(props.searchText==="")
                            return val;
                        else if(val.title.toLowerCase().includes(props.searchText.toLowerCase()))
                            return val;
                    })
                    .filter((item) =>{
                        if(props.category==="")
                            return item;
                        else if(item.category === props.category)
                            return item;
                    })
                    .filter((val) => {
                        if(props.filterPrice === 0)
                            return val;
                        else if(val.price <= props.filterPrice)
                            return val;
                    })
                    .filter((val) => {
                        if(props.filterRatings === 0)
                            return val;
                        else {
                            console.log(val.owner);
                            Axios.post('http://localhost:5000/getUser', {username: val.owner})
                            .then((res) => {
                                setsellerRating(res.data.result.rating);
                            })
                            console.log(sellerRating);
                            if(sellerRating >= props.filterRatings)
                                return val;
                        }
                    })
                    .filter((val) => {
                        if(props.filterLocation.size === 0)
                            return val;
                        else {
                            Axios.post('http://localhost:5000/getUser', {username: val.owner})
                            .then((res) => {
                                setsellerLocation(res.data.result.location);
                            })
                            console.log(sellerLocation);
                            if(props.filterLocation.has(sellerLocation))
                                return val;
                        }
                    })
                    .map((item) => {
                        let imageUrl = "/assets/images/"+item.images[0];
                        return (
                            <Link to={`/product?id=${item._id}`} className="text-decoration-none text-dark">
                            <div className="col">
                                <div className="card shadow-sm" >
                                    <img src={imageUrl} alt="..." className="card-image" />
                                    <div className="card-body">
                                    <p className="card-text card-title overflow-hidden fs-5">{item.title}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3>₹ {item.price}</h3>
                                        <Link to="/cart" className="text-decoration-none text-dark">
                                        <button type="button" className="btn btn-outline-success">Add to Cart</button>
                                        </Link>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
