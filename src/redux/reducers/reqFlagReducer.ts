// Flag used to determine when to send a request to add/update/delete the user's cards owned
import { ReqFlagActionType } from "../actions/actions";
import { SET_REQ_FLAG, RESET_REQ_FLAG } from "../actions/actionTypes";

const initialState = {
    flag: 0
};

const reqFlagReducer = (state = initialState, action: ReqFlagActionType) => {
    switch (action.type) {
        case SET_REQ_FLAG:
            return { flag: 1 };
        case RESET_REQ_FLAG:
            return { flag: 0 };
        default:
            return state;
    }
}

export default reqFlagReducer;