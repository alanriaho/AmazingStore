import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./Cart.scss";

import ProductOnCartList from "../../components/ProductOnCartList/ProductOnCartList";
import Button from "../../components/UI/Button//Button";

class Cart extends Component {
	state = {};

	componentDidMount() {
		if (!this.props.store) {
			this.props.fetchStoreFetcher();
		}
	}

	render() {
		let list = [];
		let totalAmount = 0;
		this.props.cart.forEach((product, index) => {
			totalAmount += parseFloat(product.price) * product.quantity;
			list.push(
				<ProductOnCartList
					quantity={product.quantity}
					name={product.name}
					price={product.price}
					reference={product.ref}
					clicked={() => this.props.removeFromCart(index)}
					index={index}
					key={product.ref}
				/>
			);
		});
		return (
			<div className="cart-container-component">
				<h1>Your Cart</h1>
				<div className="cart-list">{list}</div>
				<p>Total amount: US ${totalAmount.toFixed(2)}</p>
				<Button btnType="filled">Order</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStoreFetcher: () => dispatch(actions.fetchStoreFetcher()),
		removeFromCart: (index) => dispatch(actions.removeFromCart(index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
