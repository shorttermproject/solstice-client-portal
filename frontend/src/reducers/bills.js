import { combineReducers } from 'redux'
import { RECEIVE_BILLS, ADD_BILL } from '../constants/ActionTypes'

export function round(value, decimals) {
  return (Math.round(value * 100) / 100).toFixed(decimals);
}


const bills = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BILLS:
      return [...action.bills]; //assume this is only called once on load
    case ADD_BILL:
      const newState = [...state]; // clone the array
      newState.push(action.bill);
      return newState;
    default:
      return state
  }  
}

export default combineReducers({
  bills
})

export const getBill = (state, idx) =>
  state.bills[idx]

export const getAllBills = (state) =>
  state.bills

export const getTotalKwh = (state) => {
  let kwh = 0;
  state.bills.map(bill => kwh += bill.kwh);
  return kwh;
}

export const getTotalCost = (state) => {
  let cost = 0;
  state.bills.map(bill => cost += bill.bill);
  return round(cost);
}

export const getTotalSavings = (state) => {
  let savings = 0;
  state.bills.map(bill => savings += bill.savings);
  return round(savings);
}

export const getSortedBills = (state, field) =>
  state.bills.map(bill => [Date.UTC(bill.year, bill.month - 1), bill[field]])
    .sort((a, b) => a[0] - b[0])
