import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import MainPage from './MyComponents/MainPage';
import Login from './MyComponents/Login';
import Register from './MyComponents/Register';
import ProductBody from './MyComponents/ProductBody';
import ChatBox from './MyComponents/ChatBox';
import FaqPage from './MyComponents/FaqPage';
import ProfilePage from './MyComponents/ProfilePage';
import SellItem from './MyComponents/SellItem';
import Payment from './MyComponents/Payment';
import DebitCards from './MyComponents/DebitCard';
import CreditCard from './MyComponents/CreditCard';
import InternetBanking from './MyComponents/InternetBanking';
import Upi from './MyComponents/Upi';
import PaymentSuccess from './MyComponents/PaymentSuccess';
import Cart from './MyComponents/Cart';
import Discussion from './MyComponents/Discussion';
import NewPost from './MyComponents/NewPost';
import RequestPage from './MyComponents/RequestPage';
import Checkout from './MyComponents/Checkout';
import io from "socket.io-client";
import "bootstrap-icons/font/bootstrap-icons.css"
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import React, {useState} from 'react'
import EditProfile from './MyComponents/EditProfile';


const socket = io.connect("http://localhost:3001/");

function App() {

	const [searchText, setsearchText] = useState("");
	const [filterPrice, setfilterPrice] = useState(0);
	const [filterRatings, setfilterRatings] = useState(0);
	const [filterLocation, setfilterLocation] = useState(new Set());
	const [category, setcategory] = useState("");
	const [isAuthenticated, setAuthenticated] = useState(() => {
		const token = localStorage.getItem("token");
		return token !== null;
	  });

  return (
    <Router>
        <Header setsearchText = {setsearchText} />
        <Switch> 
			
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/register">
				<Register />
			</Route>
			<Route exact path="/product">
				<ProductBody />
			</Route>
			<Route exact path="/chatbox">
				{ isAuthenticated ?  <ChatBox socket = {socket}/> : <Login/>}
				
			</Route>
			<Route exact path="/faqs">
				<FaqPage />
			</Route>
			<Route exact path="/profile">
			{ isAuthenticated ? <ProfilePage /> : <Login /> }	
			</Route>
			<Route exact path="/sell">
			{ isAuthenticated ? <SellItem /> : <Login /> }
			</Route>
			<Route exact path="/payment">
			{ isAuthenticated ? <Payment/> : <Login /> }
			</Route>
			<Route exact path="/debitcard">
			{ isAuthenticated ?	<DebitCards /> : <Login /> }
			</Route>
			<Route exact path="/creditcard">
			{ isAuthenticated ? <CreditCard/> : <Login /> }
			</Route>
			<Route exact path="/cart">
			{ isAuthenticated ? <Cart /> : <Login /> }
			</Route>
			<Route exact path="/paymentsuccess">
			{ isAuthenticated ?  <PaymentSuccess /> : <Login />}	
			</Route>
			<Route exact path="/internetbanking">
			{ isAuthenticated ?  <InternetBanking /> : <Login />}
			</Route>
			<Route exact path="/upi">
			{ isAuthenticated ?  <Upi /> : <Login />}
			</Route>
			<Route exact path="/discuss">
				<Discussion />
			</Route>
			<Route exact path="/checkout">
			{ isAuthenticated ?  <Checkout /> : <Login />}
			</Route>
			<Route exact path="/newpost">
			{ isAuthenticated ? <NewPost /> : <Login />}
			</Route>
			<Route exact path="/">
				<MainPage searchText = {searchText} category = {category} setcategory = {setcategory} filterPrice = {filterPrice} filterRatings = {filterRatings}
						filterLocation = {filterLocation} setfilterPrice = {setfilterPrice} setfilterRatings = {setfilterRatings}
						setfilterLocation = {setfilterLocation} />
			</Route>
			<Route exact path="/request">
			{ isAuthenticated ? <RequestPage /> : <Login />}
				
			</Route>
			<Route exact path="/editprofile">
			{ isAuthenticated ? <EditProfile /> : <Login />}
				
			</Route>
			
        </Switch>
        <Footer/>
    </Router>
  );

}

export default App;
