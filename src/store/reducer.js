import * as actionTypes from "./actionTypes";

const initialState = {
	//General
	cart: [],
	store: null,
	results: null,
	//Auth
	showLogin: false,
	authAsUser: false,
	authAsManager: false,
	//UI
	searchBoxOnToolbar: true,
	loading: false,
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		//Auth
		case actionTypes.SHOW_LOGIN:
			return {
				...state,
				showLogin: true,
			};

		case actionTypes.HIDE_LOGIN:
			return {
				...state,
				showLogin: false,
			};
		case actionTypes.LOG_OUT:
			return {
				...state,
				authAsManager: false,
				authAsUser: false,
			};
		//IU
		//UI/SearchBox
		case actionTypes.SHOW_SEARCHBOX_ON_TOOLBAR:
			return {
				...state,
				searchBoxOnToolbar: true,
			};
		case actionTypes.HIDE_SEARCHBOX_ON_TOOLBAR:
			return {
				...state,
				searchBoxOnToolbar: false,
			};
		case actionTypes.RESET_RESULTS:
			return {
				...state,
				results: null,
			};
		//UI/Error
		case actionTypes.CLOSE_ERROR:
			let errorState = state.error;
			if (state.store) {
				errorState = null;
			}
			return {
				...state,
				error: errorState,
			};
		//Fetching
		case actionTypes.START_FETCH:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FAIL_FETCH:
			return {
				...state,
				loading: false,
				error: action.error.message,
			};
		case actionTypes.FETCH_STORE:
			return {
				...state,
				loading: false,
				store: action.store,
			};
		case actionTypes.POST_NEW_PRODUCT:
			const productsObject = state.store[action.category]
				? {
						...state.store[action.category].products,
						[action.id]: action.newProduct,
				  }
				: { [action.id]: action.newProduct };
			return {
				...state,
				store: {
					...state.store,
					[action.category]: {
						categoryName: action.categoryName,
						products: productsObject,
					},
				},
				loading: false,
			};
		case actionTypes.DELETE_PRODUCT:
			let storeCopy = {
				...state.store,
			};
			delete storeCopy[action.category].products[action.id];
			return {
				...state,
				store: storeCopy,
				loading: false,
			};

		//Searching to buy
		case actionTypes.SEARCH_BUYING:
			let resultsArray = [];
			Object.keys(action.store).forEach((category) => {
				if (action.store[category].products) {
					const productsList = action.store[category].products;
					for (const [key, product] of Object.entries(productsList)) {
						if (
							(product.productName + product.category)
								.toLowerCase()
								.includes(action.quest.toLowerCase())
						) {
							resultsArray.push(product);
						}
					}
				}
			});
			return {
				...state,
				results: resultsArray,
			};
		//Cart
		case actionTypes.ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.product],
			};
		case actionTypes.REMOVE_FROM_CART:
			const cartCopy = [...state.cart];
			for (let productIndex of cartCopy) {
				if (productIndex.ref === action.ref) {
					cartCopy.splice(productIndex, 1);
					break;
				}
			}
			return {
				...state,
				cart: cartCopy,
			};
		default:
			return state;
	}
};

export default reducer;
