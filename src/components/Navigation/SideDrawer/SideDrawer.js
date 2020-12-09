import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import CloseButton from "../../UI/CloseButton/CloseButton";
import "./SideDrawer.scss";

//Props:
//show(boolean)
//sideDrawerClosing(function)

const SideDrawer = (props) => {
	let sideDrawerClass = props.show ? "side-drawer open" : "side-drawer close";
	return (
		<>
			<Backdrop show={props.show} closing={props.sideDrawerClosing} />
			<div className={sideDrawerClass}>
				<CloseButton closeClicked={props.sideDrawerClosing} />
				<div className="logo-container">
					<Logo />
				</div>
				<nav>
					<NavigationItems closeTheMenu={props.sideDrawerClosing} />
				</nav>
			</div>
		</>
	);
};

export default SideDrawer;
