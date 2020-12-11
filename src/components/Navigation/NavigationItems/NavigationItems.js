import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./NavigationItems.scss";
import * as actions from "../../../store/actions";

import Cart from "../Cart/Cart";

//Props:
//closeTheMenu(function)

const NavigationItems = (props) => {
	const logOutHandler = () => {
		props.logOut();
		props.history.push("/");
	};

	let logInOrLogOut = props.authAsUser ? (
		<li onClick={props.closeTheMenu}>
			<div className="link" onClick={logOutHandler}>
				Log Out
			</div>
		</li>
	) : (
		<li onClick={props.closeTheMenu}>
			<div className="link" onClick={props.showLogin}>
				Log In
			</div>
		</li>
	);
	let navigationItems = (
		<>
			<li>
				<NavLink
					onClick={props.closeTheMenu}
					className="link"
					to="/"
					exact
					activeClassName="active"
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					onClick={props.closeTheMenu}
					className="link"
					to="/cart"
					activeClassName="active"
				>
					Cart <Cart width="30px" />
				</NavLink>
			</li>
			{logInOrLogOut}
		</>
	);
	if (props.authAsManager) {
		navigationItems = (
			<>
				<li>
					<NavLink
						onClick={props.closeTheMenu}
						className="link"
						to="/add-products"
						activeClassName="active"
					>
						Add Products
					</NavLink>
				</li>
				<li>
					<NavLink
						onClick={props.closeTheMenu}
						className="link"
						to="/manage-products-list"
						activeClassName="active"
					>
						Products List
					</NavLink>
				</li>
				<li onClick={props.closeTheMenu}>
					<div className="link" onClick={logOutHandler}>
						Log Out
					</div>
				</li>
			</>
		);
	}

	return <ul className="nav-items">{navigationItems}</ul>;
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		authAsUser: state.authAsUser,
		authAsManager: state.authAsManager,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showLogin: () => dispatch(actions.showLogin()),
		logOut: () => {
			dispatch(actions.logOut());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(NavigationItems));
