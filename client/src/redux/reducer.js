const initialState = {
    absenceDetails : [],
    isNotificationVisible: false,
    totalCount: 0,
    RESULTS_PER_PAGE: 10,
}

export const absenceReducer = (state = initialState, action) => {
switch(action.type) {
    case 'UPDATE_ABSENCE_DETAILS':
    // console.log("action.response",action.response);    
    return {
            ...state,
            absenceDetails: action.response,
            totalCount: action.response.length,
        };
    case 'SHOW_ERROR_NOTIFICATION':
        return { 
            ...state,
            isNotificationVisible: true,
        };
        case 'HIDE_ERROR_NOTIFICATION':
        return { 
            ...state,
            isNotificationVisible: false,
        };
       
        default:
            return state;
}

}