import * as actionTypes from "./actionTypes";
import axios from "../axios-fetching";

let camelize = (str) => {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, "");
};

//Auth
export const showLogin = () => {
	return { type: actionTypes.SHOW_LOGIN };
};
export const hideLogin = () => {
	return { type: actionTypes.HIDE_LOGIN };
};
export const logInAsUser = () => {
	return { type: actionTypes.LOG_IN_AS_USER };
};
export const logInAsManager = () => {
	return { type: actionTypes.LOG_IN_AS_MANAGER };
};
export const logOut = () => {
	return { type: actionTypes.LOG_OUT };
};
//UI
export const showSearchBoxOnToolbar = () => {
	return { type: actionTypes.SHOW_SEARCHBOX_ON_TOOLBAR };
};
export const hideSearchBoxOnToolbar = () => {
	return { type: actionTypes.HIDE_SEARCHBOX_ON_TOOLBAR };
};
export const closeError = () => {
	return { type: actionTypes.CLOSE_ERROR };
};
export const resetResults = () => {
	return { type: actionTypes.RESET_RESULTS };
};
//Fetching
export const startFetch = () => {
	return { type: actionTypes.START_FETCH };
};
export const failFetch = (error) => {
	return { type: actionTypes.FAIL_FETCH, error: error };
};
export const fetchStore = (quest) => {
	return { type: actionTypes.FETCH_STORE, store: quest };
};
export const fetchStoreFetcher = () => {
	return (dispatch) => {
		dispatch(startFetch());
		axios
			.get("/store.json")
			.then((response) => {
				dispatch(fetchStore(response.data));
			})
			.catch((error) => dispatch(failFetch(error)));
	};
};
export const postNewProduct = (newProduct, category, id, categoryName) => {
	return {
		type: actionTypes.POST_NEW_PRODUCT,
		newProduct: newProduct,
		category: category,
		id: id,
		categoryName: categoryName,
	};
};
export const postNewProductFetcher = (
	newProduct,
	category,
	newCategory,
	callbackFunction
) => {
	return (dispatch) => {
		dispatch(startFetch());
		if (!newCategory) {
			axios
				.post("/store/" + camelize(category) + "/products.json", newProduct)
				.then((response) =>
					dispatch(
						postNewProduct(
							newProduct,
							camelize(category),
							response.data.name,
							category
						)
					)
				)
				.then(callbackFunction())
				.catch((error) => {
					dispatch(failFetch(error));
				});
		} else {
			axios.put("/store/" + camelize(category) + ".json", newCategory).then(
				axios
					.post("/store/" + camelize(category) + "/products.json", newProduct)
					.then((response) =>
						dispatch(
							postNewProduct(
								newProduct,
								camelize(category),
								response.data.name,
								category
							)
						)
					)
					.then(callbackFunction())
					.catch((error) => {
						dispatch(failFetch(error));
					})
			);
		}
	};
};
export const deleteProduct = (category, id) => {
	return { type: actionTypes.DELETE_PRODUCT, category: category, id: id };
};
export const deleteProductFetcher = (path, category, id) => {
	return (dispatch) => {
		dispatch(startFetch());
		axios
			.put("/store/" + path + "/.json", {})
			.then(dispatch(deleteProduct(category, id)))
			.catch((error) => {
				dispatch(failFetch(error));
			});
	};
};
//Searching to buy
export const searchBuying = (quest, store) => {
	return { type: actionTypes.SEARCH_BUYING, quest: quest, store: store };
};
//Cart
export const addToCart = (product) => {
	return { type: actionTypes.ADD_TO_CART, product: product };
};
export const removeFromCart = (index) => {
	return { type: actionTypes.REMOVE_FROM_CART, index: index };
};
export const changeQuantity = (newQuantity, index) => {
	return {
		type: actionTypes.CHANGE_QUANTITY,
		newQuantity: newQuantity,
		index: index,
	};
};
