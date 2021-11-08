import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import ProductItem from "./ProductItem";
import baseUrl from '../services/Baseurl'


export default function DisplaySeller(props) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        getProductDetails();
    }, [],
    );
    let [items, setItems] = useState([]);
    let [items_noImage, setItemsNoImage] = useState([]);
    let [status, setStatus] = useState("");
    function getProductDetails() {
        setStatus(props.status);
        let url = baseUrl + 'products/getRequestProduct?oid=' + props.id;
        Axios.get(url, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
            .then((res) => {
                console.log(res);
                let details = [];
                for(var i=0; i<res.data.result.length ;i++) {
                    let obj = {
                        title : res.data.result[i].title,
                        desc : res.data.result[i].desc,
                        price : res.data.result[i].price,
                        owner : res.data.result[i].owner,
                        category : res.data.result[i].category,
                    }
                    details.push(obj);
                }
                setItemsNoImage(details);
                setItems(res.data.result);
            })
    }

    const toggle = () => setIsOpen(!isOpen);

    function makeRequest() {
        let url = baseUrl + 'products/makeRequest';
        Axios.post(url, {
            id: props.id,
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
            .then((res) => {
                console.log(res);
                setStatus("pending");
            })

    }
    function calucateTotal() {
        let total = 0;
        items.map((item) => {
            total += Number(item.price);
        })
        return total;
    }

    function cancelOrder(){
        let url = baseUrl + "products/cancelOrder";
        Axios.post(url, {
            id: props.id,
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })

    }

    return (
        <div className="bg-light rounded">
            <div className="fs-3">{props.seller}</div>
            <div className="d-flex justify-content-between py-2">
                <div className="">SubTotal</div>
                <div className="">{calucateTotal()}</div>
            </div>
            <div>
                <div color="primary" onClick={toggle} style={{ marginBottom: "1rem" }} >
                    Products
                </div>
                <div isOpen={isOpen}>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-bold">Product Image</p>
                                </div>
                                <div>
                                    <p className="fw-bold">Name </p>
                                </div>
                                <div>
                                    <p className="fw-bold">Description</p>
                                </div>
                                <div >
                                    <p className="fw-bold">Price</p>
                                </div>

                            </div>
                            {
                                items.map(function (d) {
                                    let imageUrl = `data:image/jpeg;base64,${d.images[0].data}`;
                                    return (
                                        <>
                                            <hr />
                                            <ProductItem name={d.title} discription={d.desc} price={d.price} imageUrl={imageUrl} />

                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex py-2 justify-content-between">
                <div>
                    <button type="button" 
                    disabled={status === "accepted"}
                    onClick={makeRequest} 
                    className={status === "pending" ? " btn btn-warning" : " btn btn-success"}>
                        {status}
                    </button>
                </div>
                <div>
                    <Link to= "/chatbox">
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={status === "pending"}
                            disables >
                            Make Offer
                        </button>
                    </Link>
                </div>
                <div>
                    <button
                        onClick={cancelOrder}
                        type="button"
                        className="btn btn-danger"
                        disabled={status === "pending"}
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <Link to={
                        {
                            pathname: "/checkout",
                            state:  { items : items_noImage, order : props.order},
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-success"
                            disabled={status === "pending"|| status === "Request" || status === "rejected"}
                        >
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
