import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import Modal from "../UI/Modal/Modal";

const ErrorMessage = (props) => (
	<Modal
		show={props.error}
		modalClosing={() => {
			props.closeError();
			props.fetchStoreFetcher();
		}}
	>
		{props.error}
		<p>
			Please be sure to have an internet conection, until that happens, you
			won't be able to close this modal.
		</p>
	</Modal>
);

const mapStateToProps = (state) => {
	return { error: state.error };
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeError: () => dispatch(actions.closeError()),
		fetchStoreFetcher: () => dispatch(actions.fetchStoreFetcher()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
