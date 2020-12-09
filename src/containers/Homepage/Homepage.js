import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Homepage.scss";
import * as actions from "../../store/actions";

import Jumbotron from "../../components/Jumbotron/Jumbotron";
import ProductOnBuyingList from "../../components/ProductOnBuyingList/ProductOnBuyingList";
import CloseButton from "../../components/UI/CloseButton/CloseButton";

class Homepage extends Component {
	state = {};

	componentDidMount() {
		this.props.fetchStoreFetcher();
		if (window.innerWidth >= 600) {
			this.props.hideSearchBoxOnToolbar();
			window.addEventListener("scroll", this.searchBoxOnToolbarHandler);
		}
	}

	componentDidUpdate() {
		const yScroll =
			document.body.scrollHeight < 490 ? document.body.scrollHeight : 490;
		window.scrollTo({
			top: yScroll,
			left: 0,
			behavior: "smooth",
		});
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.searchBoxOnToolbarHandler, true);
		this.props.showSearchBoxOnToolbar();
	}

	searchBoxOnToolbarHandler = () => {
		if (window.pageYOffset >= 350 && this.props.searchBoxOnToolbar === false) {
			this.props.showSearchBoxOnToolbar();
		} else if (
			window.pageYOffset < 350 &&
			this.props.searchBoxOnToolbar === true
		) {
			this.props.hideSearchBoxOnToolbar();
		}
	};

	render() {
		let productsResults = null;
		let list = [];
		if (this.props.results) {
			this.props.results.forEach((product) => {
				list.push(
					<Link key={product.ref} to={"/product/" + product.ref}>
						<ProductOnBuyingList
							title={product.productName}
							price={product.price}
						/>
					</Link>
				);
			});
			productsResults = (
				<>
					<CloseButton closeClicked={this.props.resetResults} color="#000000" />
					<h2 id="results">Results</h2>
					{list}
				</>
			);
		}
		return (
			<div className="homepage">
				<Jumbotron />
				<div className="buying-list">{productsResults}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchBoxOnToolbar: state.searchBoxOnToolbar,
		results: state.results,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showSearchBoxOnToolbar: () => dispatch(actions.showSearchBoxOnToolbar()),
		hideSearchBoxOnToolbar: () => dispatch(actions.hideSearchBoxOnToolbar()),
		fetchStoreFetcher: () => dispatch(actions.fetchStoreFetcher()),
		resetResults: () => dispatch(actions.resetResults()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
