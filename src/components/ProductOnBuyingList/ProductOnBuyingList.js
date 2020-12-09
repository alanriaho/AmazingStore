import React from "react";

import "./ProductOnBuyingList.scss";

const ProductOnBuyingList = (props) => (
	<div className="product-on-buying-list">
		<h4>{props.title}</h4>
		<p>US ${props.price}</p>
	</div>
);

export default ProductOnBuyingList;
