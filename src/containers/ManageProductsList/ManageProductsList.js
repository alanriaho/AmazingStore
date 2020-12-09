import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./ManageProductsList.scss";

import ProductOnManageList from "../../components/ProductOnManageList/ProductOnManageList";
import Input from "../../components/Input/Input";

class ManageProductsList extends Component {
	state = {
		searchForm: {
			search: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Search products...",
				},
				value: "",
			},
		},
		typing: false,
	};

	componentDidMount() {
		if (!this.props.store) {
			this.props.fetchStoreFetcher();
		}
		this.props.hideSearchBoxOnToolbar();
	}

	inputChangedHandler = (event) => {
		const updatedSearchForm = {
			...this.state.searchForm,
		};
		const updatedSearchElement = {
			...updatedSearchForm.search,
		};
		updatedSearchElement.value = event.target.value;
		updatedSearchForm.search = updatedSearchElement;
		this.setState({ searchForm: updatedSearchForm, typing: true });
		if (updatedSearchElement.value === "") {
			this.setState({ typing: false });
		}
	};

	inputBlurredHandler = () => {
		this.setState({ typing: false });
	};

	deleteProductHandler = (path) => {};

	render() {
		let list = null;
		if (this.props.loading) {
			list = "Loading...";
		}
		if (this.props.store) {
			list = [];
			Object.keys(this.props.store).forEach((category) => {
				if (this.props.store[category].products) {
					const productsList = this.props.store[category].products;
					for (const [key, product] of Object.entries(productsList)) {
						if (
							(product.productName + product.category + product.ref)
								.toLowerCase()
								.includes(this.state.searchForm.search.value.toLowerCase())
						) {
							const path = category + "/products/" + key;
							list.push(
								<ProductOnManageList
									name={product.productName}
									reference={product.ref}
									stock={product.stock}
									price={product.price}
									key={product.ref}
									deleteProduct={() =>
										this.props.deleteProductFetcher(path, category, key)
									}
								/>
							);
						}
					}
				}
			});
		}
		return (
			<div className="manage-product-container">
				<h2>Welcome</h2>
				<form>
					<Input
						elementType={this.state.searchForm.search.elementType}
						elementConfig={this.state.searchForm.search.elementConfig}
						value={this.state.searchForm.search.value}
						changed={(event) => this.inputChangedHandler(event)}
						blurred={this.inputBlurredHandler}
					/>
				</form>
				<div className="manage-products-list">{list}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		store: state.store,
		loading: state.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		hideSearchBoxOnToolbar: () => dispatch(actions.hideSearchBoxOnToolbar()),
		fetchStoreFetcher: () => dispatch(actions.fetchStoreFetcher()),
		deleteProductFetcher: (path, category, id) =>
			dispatch(actions.deleteProductFetcher(path, category, id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsList);
