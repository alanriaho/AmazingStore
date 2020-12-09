import React from "react";

import "./ProductCategory.scss";

const ProductCategory = (props) => (
	<div className="category">
		<hr />
		<h3>{props.categoryName}</h3>
		<ul>{props.children}</ul>
	</div>
);

export default ProductCategory;
