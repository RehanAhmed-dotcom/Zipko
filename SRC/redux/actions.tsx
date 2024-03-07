//=======================================================Action Types Constants
const USER_AUTHORIZE = 'USER_SIGN_IN',
  USER_LOGOUT = 'USER_LOGOUT',
  FETCHING_LOADING = 'FETCHING_LOADING',
  USER_REFRESH = 'USER_REFRESH',
  UPDATE = 'UPDATE',
  CONNECTION='CONNECTION',
  UPDATEPAYMENT='UPDATEPAYMENT',
  UPDATEPAYMENT_LOGOUT='UPDATEPAYMENT_LOGOUT',
  DARKMODE='DARKMODE',
  FCM='FCM',
  ALLNOTIFICATION='ALLNOTIFICATION';
//========================================================Dispatchers
const userAuthorize = (payload) => async (dispatch) => {
  dispatch({type: USER_AUTHORIZE, payload});
  return '';
};
const userRefresh = (payload) => (dispatch) => {
  dispatch({type: USER_REFRESH, payload});
};
const logout = () => (dispatch) => {
  dispatch({type: USER_LOGOUT});
  dispatch({type: UPDATEPAYMENT_LOGOUT});
};
const setLoader = (payload) => (dispatch) => {
  dispatch({type: FETCHING_LOADING, payload});
};
const updateuser = (payload) => (dispatch) => {
  dispatch({type: UPDATE, payload});
};
const updatepayment = (payload) => (dispatch) => {
  dispatch({type: UPDATEPAYMENT, payload});
};
const internetconnection = (payload) => (dispatch) => {
  dispatch({type: CONNECTION, payload});
};
const darkthem = (payload) => (dispatch) => {
  dispatch({type: DARKMODE, payload});
};
const allnotification = (payload) => (dispatch) => {
  dispatch({type: ALLNOTIFICATION, payload});
};
const fcm = payload => dispatch => dispatch({ type: FCM, payload });
//========================================================Exporter
const ActionType = {
  FETCHING_LOADING,
  USER_REFRESH,
  USER_LOGOUT,
  USER_AUTHORIZE,
  UPDATE,
  CONNECTION,
  UPDATEPAYMENT,
  UPDATEPAYMENT_LOGOUT,
  DARKMODE,
  FCM,
  ALLNOTIFICATION,
};
export {ActionType,allnotification,fcm, logout, setLoader, userAuthorize, userRefresh,updateuser,internetconnection,updatepayment,darkthem};
