import React, { Component } from "react";
import { connect } from "react-redux";

import "./Layout.scss";

import LogIn from "../../components/LogIn/LogIn";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

class Layout extends Component {
	state = {
		menuOpen: false,
	};

	//Toolbar methods:
	menuCloseHandler = () => {
		this.setState({ menuOpen: false });
	};
	menuOpenHandler = () => {
		this.setState({ menuOpen: true });
	};

	render() {
		return (
			<>
				<SideDrawer
					show={this.state.menuOpen}
					sideDrawerClosing={this.menuCloseHandler}
				/>
				<Toolbar menuButtonOpen={this.menuOpenHandler} />
				<LogIn />
				<main className="content">{this.props.children}</main>
				<ErrorMessage />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authAsManager: state.authAsManager,
	};
};

export default connect(mapStateToProps)(Layout);
