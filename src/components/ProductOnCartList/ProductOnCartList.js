import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProductOnCartList.scss";
import * as actions from "../../store/actions";

import Input from "../Input/Input";

class ProductOnCartList extends Component {
	state = {
		form: {
			quantity: {
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: "Quantity",
				},
				value: "",
			},
		},
	};

	componentDidMount() {
		let formCopy = { ...this.state.form };
		formCopy.quantity.value = this.props.quantity;
		this.setState({ form: formCopy });
	}

	inputChangedHandler = (event) => {
		if (event.target.value >= 0) {
			let formCopy = { ...this.state.form };
			formCopy.quantity.value = event.target.value;
			this.setState({ form: formCopy });
			if (event.target.value > 0) {
				this.props.changeQuantity(event.target.value, this.props.index);
			}
		}
	};

	inputBlurredHandler = () => {
		if (
			this.state.form.quantity.value === 0 ||
			isNaN(this.state.form.quantity.value)
		) {
			let formCopy = { ...this.state.form };
			formCopy.quantity.value = 1;
			this.props.changeQuantity(1, this.props.index);
			this.setState({ form: formCopy });
		}
	};

	render() {
		return (
			<div className="product-on-cart-list">
				<span className="remove" onClick={this.props.clicked}>
					Remove
				</span>
				<div>
					<div>
						<h4>{this.props.name}</h4>
						<p className="price">US ${this.props.price}</p>
					</div>
					<div className="quantity-controller">
						<Input
							elementType={this.state.form.quantity.elementType}
							elementConfig={this.state.form.quantity.elementConfig}
							value={this.state.form.quantity.value}
							changed={(event) => this.inputChangedHandler(event)}
							blurred={this.inputBlurredHandler}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeQuantity: (newQuantity, index) =>
			dispatch(actions.changeQuantity(newQuantity, index)),
	};
};

export default connect(null, mapDispatchToProps)(ProductOnCartList);
