import React from "react";
import { connect } from "react-redux";

import cartIcon from "./cart-icon.svg";
import "./Cart.scss";

//Props:
//width(string)
//count(number)

const Cart = (props) => {
	let counter = 0;
	props.cart.forEach((product) => {
		counter += parseInt(product.quantity);
	});

	return (
		<div className="cart" style={{ width: props.width }}>
			<img src={cartIcon} alt="Cart" />
			<p className="counter">{counter}</p>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(Cart);
