import React from "react";

import "./Input.scss";

/* 
Props:
elementType (string): represents the tag that will be used for the input
elementConfig (object): guards important information for the tag
value (string): can be important information for some tags
label (string)
changed(function)
blurred(function)
*/

const Input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					onChange={props.changed}
					className="input-element"
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					onChange={props.changed}
					onBlur={props.blurred}
					className="input-element"
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case "select":
			const optionTags = props.elementConfig.options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.displayValue}
				</option>
			));
			inputElement = (
				<select
					onChange={props.changed}
					onBlur={props.blurred}
					className="input-element"
					value={props.value}
				>
					<option>Select an option</option>
					{optionTags}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					onChange={props.changed}
					onBlur={props.blurred}
					className="input-element"
					{...props.elementConfig}
					value={props.value}
				/>
			);
	}

	return (
		<div className="input-component">
			<label>{props.elementConfig.placeholder}:</label>
			{inputElement}
		</div>
	);
};
export default Input;
