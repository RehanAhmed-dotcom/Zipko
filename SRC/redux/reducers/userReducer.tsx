import {ActionType} from '../actions';
const InitialState = {
  isLoggedIn: false,
  userData: {},
  countNBnumber:{"notif":"0","bookg":"0"},
  connection:false,
};

export default (state = InitialState, {type, payload}) => {
  switch (type) {
    case ActionType.USER_AUTHORIZE: {
      // console.log('hhhh', 'Why m i calling');
      return {
        isLoggedIn: true,
        userData: {...payload},
      };
    }
    case ActionType.USER_LOGOUT: {
      return InitialState;
    }
    case ActionType.UPDATE: {
      return {
        ...state,
        userData: {...payload},
      };
    }
    case ActionType.UPDATE: {
      return {
        ...state,
        userData: {...payload},
      };
    }
    case ActionType.CONNECTION: {
      return {
        ...state,
        connection: {payload},
      };
    }
    case ActionType.FCM: {
      return {
        ...state,
        fcmtoken: payload,
      };
    }
    case ActionType.ALLNOTIFICATION: {
      return {
        ...state,
        countNBnumber: payload,
      };
    }
    default:
      return state;
  }
};
