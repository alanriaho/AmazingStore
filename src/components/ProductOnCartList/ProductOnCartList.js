import React from "react";

import "./ProductOnCartList.scss";

const ProductOnCartList = (props) => (
	<div className="product-on-cart-list">
		<span className="delete" onClick={props.clicked}>
			Delete
		</span>
		<div>
			<div>
				<h4>{props.name}</h4>
				<p className="price">US ${props.price}</p>
			</div>
			<div className="quantity-controller">
				<p>Quantity: {props.quantity}</p>
			</div>
		</div>
	</div>
);

export default ProductOnCartList;
