import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./AddProducts.scss";

import Input from "../../components/Input/Input";
import Button from "../../components/UI/Button/Button";

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

class AddProducts extends Component {
	state = {
		newProductForm: {
			productName: inputStateFormat("input", "text", "Product name"),
			category: inputStateFormat("select", null, "Category", {
				options: [{ value: "", displayValue: "" }],
			}),
			ref: inputStateFormat("input", "number", "Reference"),
			price: inputStateFormat("input", "number", "Price (in dollars)"),
			stock: inputStateFormat("input", "number", "Quantity in stock"),
			description: inputStateFormat("textarea", "text", "Description"),
		},
		storeFetched: false,
	};

	componentDidMount() {
		if (!this.props.store) {
			this.props.fetchStoreFetcher();
		} else {
			this.updateCategoryInput();
		}
		this.props.hideSearchBoxOnToolbar();
	}

	componentDidUpdate() {
		this.updateCategoryInput();
	}

	updateCategoryInput = () => {
		if (!this.state.storeFetched) {
			const newProductFormCopy = { ...this.state.newProductForm };
			newProductFormCopy.category = inputStateFormat(
				"select",
				null,
				"Category",
				{
					options: Object.keys(this.props.store).map((category) => {
						return {
							value: this.props.store[category].categoryName,
							displayValue: this.props.store[category].categoryName,
						};
					}),
				}
			);
			this.setState({ newProductForm: newProductFormCopy, storeFetched: true });
		}
	};

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let key in this.state.newProductForm) {
			formData[key] = this.state.newProductForm[key].value;
		}
		const callbackFunction = () => {
			for (let key in this.state.newProductForm) {
				this.state.newProductForm[key].value = "";
			}
		};
		if (this.state.newProductForm.category.elementType === "select") {
			this.props.postNewProductFetcher(
				formData,
				this.state.newProductForm.category.value,
				null,
				callbackFunction
			);
		} else {
			const newCategory = {
				categoryName: this.state.newProductForm.category.value,
			};
			this.props.postNewProductFetcher(
				formData,
				this.state.newProductForm.category.value,
				newCategory,
				callbackFunction
			);
		}
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedAddProductForm = {
			...this.state.newProductForm,
		};
		const updatedFormElement = {
			...updatedAddProductForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedAddProductForm[inputIdentifier] = updatedFormElement;
		this.setState({ newProductForm: updatedAddProductForm });
	};

	addNewCategory = () => {
		const newProductFormCopy = this.state.newProductForm;
		const newCategoryInput = inputStateFormat("input", "text", "Category");
		this.setState({
			newProductForm: {
				...newProductFormCopy,
				category: newCategoryInput,
			},
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.newProductForm) {
			formElementsArray.push({
				id: key,
				info: this.state.newProductForm[key],
			});
		}
		let inputElements = formElementsArray.map((form) => {
			if (form.info.elementType !== "select") {
				return (
					<Input
						key={form.id}
						elementType={form.info.elementType}
						elementConfig={form.info.elementConfig}
						value={form.info.value}
						changed={(event) => this.inputChangedHandler(event, form.id)}
					/>
				);
			} else {
				return (
					<div className="category-section" key={form.id}>
						<Input
							elementType={form.info.elementType}
							elementConfig={form.info.elementConfig}
							value={form.info.value}
							changed={(event) => this.inputChangedHandler(event, form.id)}
						/>
						<span onClick={this.addNewCategory}>Add new category</span>
					</div>
				);
			}
		});
		return (
			<div className="add-products-container">
				<h2>Welcome</h2>
				<p>Fill the following data to upload the new product</p>
				<form>
					{inputElements}
					<Button
						btnType="filled"
						clicked={(event) => this.orderHandler(event)}
					>
						Add Product
					</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		store: state.store,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		hideSearchBoxOnToolbar: () => dispatch(actions.hideSearchBoxOnToolbar()),
		fetchStoreFetcher: () => dispatch(actions.fetchStoreFetcher()),
		postNewProductFetcher: (
			newProduct,
			category,
			newOrOld,
			callbackFunction
		) => {
			dispatch(
				actions.postNewProductFetcher(
					newProduct,
					category,
					newOrOld,
					callbackFunction
				)
			);
		},
		closeError: () => dispatch(actions.closeError()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
