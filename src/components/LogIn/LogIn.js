import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import Modal from "../UI/Modal/Modal";
import Input from "../Input/Input";
import Button from "../UI/Button/Button";
import "./LogIn.scss";

const inputStateFormat = (
	elementType,
	configType,
	placeholder,
	elementConfig,
	value
) => {
	if (elementType === "input") {
		return {
			elementType: elementType,
			elementConfig: {
				type: configType,
				placeholder: placeholder,
			},
			value: value ? value : "",
		};
	} else {
		return {
			elementType: elementType,
			elementConfig: { ...elementConfig, placeholder },
			value: value ? value : "",
		};
	}
};

class LogIn extends Component {
	state = {
		loginForm: {
			username: inputStateFormat("input", "text", "Username"),
			password: inputStateFormat("input", "password", "Password"),
		},
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedLoginForm = {
			...this.state.loginForm,
		};
		const updatedFormElement = {
			...updatedLoginForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedLoginForm[inputIdentifier] = updatedFormElement;
		this.setState({ loginForm: updatedLoginForm });
	};

	loginHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let key in this.state.loginForm) {
			formData[key] = this.state.loginForm[key].value;
		}
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.loginForm) {
			formElementsArray.push({
				id: key,
				info: this.state.loginForm[key],
			});
		}
		const inputElements = formElementsArray.map((form) => (
			<Input
				key={form.id}
				elementType={form.info.elementType}
				elementConfig={form.info.elementConfig}
				value={form.info.value}
				changed={(event) => this.inputChangedHandler(event, form.id)}
			/>
		));
		return (
			<Modal show={this.props.showLogin} modalClosing={this.props.hideLogin}>
				<div className="login-container">
					<p>Welcome</p>
					<form onSubmit={this.loginHandler}>
						{inputElements}
						<div className="buttons-container">
							<Button btnType="ghosted" clicked={this.props.hideLogin}>
								Cancel
							</Button>
							<Button btnType="filled" clicked={this.loginHandler}>
								Log In
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		showLogin: state.showLogin,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		hideLogin: () => dispatch(actions.hideLogin()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
