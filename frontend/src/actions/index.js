import shop from '../api/account'
import * as types from '../constants/ActionTypes'

const receiveBills = bills => ({
  type: types.RECEIVE_BILLS,
  bills
})

export const getAllBills = () => dispatch => {
  shop.getBills(bills => {
    dispatch(receiveBills(bills))
  })
}

const addBillUnsafe = bill => ({
  type: types.ADD_BILL,
  bill
})

export const addBill = billId => (dispatch, getState) => {
  dispatch(addBillUnsafe(billId))
}