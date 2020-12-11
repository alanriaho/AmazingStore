import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./SearchBox.scss";
import * as actions from "../../store/actions";

import searchIcon from "./search_icon.svg";
import Input from "../Input/Input";

//Props:
//clicked(function)
//hide(boolean)

class SearchBox extends Component {
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
	};

	inputChangedHandler = (event) => {
		const updatedSearchForm = {
			...this.state.searchForm,
		};
		const updatedSearchElement = {
			...updatedSearchForm.search,
		};
		updatedSearchElement.value = event.target.value;
		updatedSearchForm.search = updatedSearchElement;
		this.setState({ searchForm: updatedSearchForm });
	};

	searchHandler = (event) => {
		event.preventDefault();
		if (this.props.store) {
			if (this.state.searchForm.search.value !== "") {
				this.props.searchBuying(
					this.state.searchForm.search.value,
					this.props.store
				);
			}
			this.props.history.push({ pathname: "/", hash: "#results" });
		} else {
			alert(
				"Please reload your page and be sure to have an internet conection."
			);
		}
	};

	render() {
		let resultsOverview = null;
		if (this.props.loading) {
			resultsOverview = "Loading...";
		} else if (this.props.store) {
			resultsOverview = [];
			Object.keys(this.props.store).forEach((category) => {
				if (this.props.store[category].products) {
					const productsList = this.props.store[category].products;
					for (const [key, product] of Object.entries(productsList)) {
						if (
							(product.productName + product.category)
								.toLowerCase()
								.includes(this.state.searchForm.search.value.toLowerCase()) &&
							this.state.searchForm.search.value.length > 1 &&
							resultsOverview.length < 6
						)
							resultsOverview.push(
								<Link key={product.ref} to={"/product/" + product.ref}>
									<li>{product.productName}</li>
								</Link>
							);
					}
				}
			});
		}
		let searchBox = null;
		if (!this.props.hide) {
			const searchElement = this.state.searchForm.search;
			searchBox = (
				<div className="search-box-component-container">
					<form
						onSubmit={(event) => {
							this.searchHandler(event);
						}}
					>
						<div className="search-box">
							<Input
								elementType={searchElement.elementType}
								elementConfig={searchElement.elementConfig}
								value={searchElement.value}
								changed={(event) => this.inputChangedHandler(event)}
							/>
							<div
								onClick={(event) => {
									this.searchHandler(event);
								}}
							>
								<img src={searchIcon} alt="Search icon" />
							</div>
						</div>
						<ul className="results-overview-container">{resultsOverview}</ul>
					</form>
				</div>
			);
		}
		return searchBox;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		store: state.store,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchBuying: (quest, store) =>
			dispatch(actions.searchBuying(quest, store)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SearchBox));
