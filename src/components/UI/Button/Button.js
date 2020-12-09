import React from "react";
import "./Button.scss";

/* 

Props:
clicked: Function shot when clicked
btnType: Style of the button - Options: 'filled', 'ghosted'.

*/

const Button = (props) => (
	<button onClick={props.clicked} className={props.btnType + " button"}>
		{props.children}
	</button>
);

export default Button;
