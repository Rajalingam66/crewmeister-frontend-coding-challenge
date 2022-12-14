import { createSelector} from 'reselect';
export const selectState = (state) => {
// console.log("state",state?.absence);
 return state?.absence || {};
}

const absenceDetailsSelector = createSelector(selectState, (data) =>{
const {absenceDetails , totalCount } = data;
// console.log("Selector Data", data);
return { absenceDetails, totalCount };
});

export {
    absenceDetailsSelector,
};