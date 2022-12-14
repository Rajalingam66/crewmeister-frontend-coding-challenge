import { takeLatest, all, put, } from 'redux-saga/effects';
import * as API from './api';


export function* getAbsenceDetails(){
    //showLoader();
    try{
        const apiResponse = yield API.getAbsenceData();
        let response = [];
        // console.log("apiResponse",apiResponse);
        if(apiResponse?.data?.data) {
            response = apiResponse?.data?.data?.map((absence)=>{
                    const absenceData = {...absence};
                    absenceData.startDate = new Date(absenceData.startDate);
                    absenceData.endDate = new Date(absenceData.endDate);
                    return absenceData;
                    });
        }
            
        yield put({type:'UPDATE_ABSENCE_DETAILS', response: response});
    }
    catch(error)
    {
        console.log("getAbsenceDetails saga error",error);
        yield put({type:'SHOW_ERROR_NOTIFICATION'});
         //hideLoader();
    }

    //hideLoader();
}

export function* actionWatcher() {
    yield takeLatest('GET_ABSENCE_DETAILS', getAbsenceDetails);
}
export default function* rootSaga() {
    yield all([actionWatcher()]);
} 