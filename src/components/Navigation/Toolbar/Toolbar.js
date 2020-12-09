import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import MenuButton from "../MenuButton/MenuButton";
import SearchBox from "../../SearchBox/SearchBox";

import "./Toolbar.scss";

const Toolbar = (props) => (
	<div className="toolbar">
		<div className="menu-button-container" onClick={props.menuButtonOpen}>
			<MenuButton />
		</div>
		<div className="logo-container">
			<NavLink to="/">
				<Logo />
			</NavLink>
		</div>
		<div className="search-box-container">
			<SearchBox hide={!props.searchBoxOnToolbar} />
		</div>
		<nav>
			<NavigationItems />
		</nav>
	</div>
);

const mapStateToProps = (state) => {
	return {
		searchBoxOnToolbar: state.searchBoxOnToolbar,
	};
};

export default connect(mapStateToProps)(Toolbar);
