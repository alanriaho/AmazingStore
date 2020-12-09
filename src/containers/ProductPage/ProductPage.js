import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions";
import "./ProductPage.scss";

import Button from "../../components/UI/Button/Button";

class ProductPage extends Component {
	state = {
		name: null,
		description: null,
		price: null,
		ref: null,
		fetched: false,
	};

	componentDidMount() {
		if (!this.props.store) {
			this.props.fetchStoreFetcher();
		} else {
			this.renderProduct();
		}
	}

	componentDidUpdate() {
		this.renderProduct();
	}

	renderProduct = () => {
		if (this.props.store && !this.state.fetched) {
			Object.keys(this.props.store).forEach((category) => {
				if (this.props.store[category].products) {
					const productsList = this.props.store[category].products;
					for (const [key, product] of Object.entries(productsList)) {
						if (product.ref === this.props.match.params.id) {
							this.setState({
								name: product.productName,
								description: product.description,
								price: product.price,
								ref: product.ref,
								fetched: true,
							});
						}
					}
				}
			});
		}
	};

	addToCartHandler = (event) => {
		event.preventDefault();
		if (this.props.cart.every((product) => product.ref !== this.state.ref)) {
			this.props.addToCart({
				name: this.state.name,
				price: this.state.price,
				ref: this.state.ref,
				quantity: 1,
			});
		}
		this.props.history.push("/cart");
	};

	render() {
		return (
			<div className="product-page">
				<h1>{this.state.name}</h1>
				<div className="spans">
					<span>Price: US ${this.state.price}</span>
					<span>Ref: {this.state.ref}</span>
				</div>
				<div className="description">
					<p>Description:</p>
					<p>{this.state.description}</p>
				</div>
				<div className="button-container">
					<Button
						btnType="ghosted"
						clicked={(event) => this.addToCartHandler(event)}
					>
						Add to Cart
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		store: state.store,
		cart: state.cart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStoreFetcher: () => dispatch(actions.fetchStoreFetcher()),
		closeError: () => dispatch(actions.closeError()),
		addToCart: (product) => dispatch(actions.addToCart(product)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProductPage));
