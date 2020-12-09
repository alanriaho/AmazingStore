import { Route, Switch } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Homepage from "./containers/Homepage/Homepage";
import Cart from "./containers/Cart/Cart";
import ProductPage from "./containers/ProductPage/ProductPage";
import ManageProductsList from "./containers/ManageProductsList/ManageProductsList";
import AddProducts from "./containers/AddProducts/AddProducts";

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/manage-products-list" component={ManageProductsList} />
				<Route path="/add-products" component={AddProducts} />
				<Route path="/product/:id" component={ProductPage} />
				<Route path="/cart" component={Cart} />
				<Route path="/" component={Homepage} />
			</Switch>
		</Layout>
	);
}

export default App;
