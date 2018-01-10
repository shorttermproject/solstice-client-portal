import { combineReducers } from 'redux'
import bills, * as fromBills from './bills'

export default combineReducers({
  bills
})

const getBill = (state, idx) => fromBills.getBill(state.bills, idx)

export const getAllBills = state => state.bills
  