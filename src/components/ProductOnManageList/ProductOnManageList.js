import React from "react";

import "./ProductOnManageList.scss";

const ProductOnManageList = (props) => (
	<div className="product-on-manage-list">
		<div>
			<h4>{props.name}</h4>
			<p>{props.reference}</p>
		</div>
		<p>Stock: {props.stock}</p>
		<p>Price: US ${props.price}</p>
		<span onClick={() => props.deleteProduct()}>Delete element</span>
	</div>
);

export default ProductOnManageList;
