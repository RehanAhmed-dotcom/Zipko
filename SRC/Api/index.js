import Axios from 'axios';

const axios = Axios.create({
  baseURL: `https://sodhnoos.com/app/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const baseURL = `https://sodhnoos.com/app/api`;
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

const authorizedHeaders1 = {
  'Content-Type': 'application/json',
  Accept: 'multipart/form-data',
  Authorization: '',
};

const registerUser = payload => {
  const request = `/register`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const checkUserName = payload => {
  const request = `/check-username-exist`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const ChangePassword = payload => {
  const request = `/reset`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const Codeverified_signup = payload => {
  const request = `/verify`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const Codeverified = payload => {
  const request = `/confirm-code`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const Emailverified_signup = payload => {
  const request = `/verify-email`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const Emailverified = payload => {
  const request = `/forgot`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const loginUser = payload => {
  const request = `/login`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const getExperties = () => {
  // console.log('----------------------------00000000000000',payload)
  const request = `/expertise`;
  return axios
    .get(request, null)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const getandCreateExperties = payload => {
  // console.log('----------------------------00000000000000',payload)
  const request = `/create-expertise/${payload.nam}`;
  return axios
    .get(request, null)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const getTopics = () => {
  // console.log('----------------------------00000000000000',payload)
  const request = `/topics`;
  return axios
    .get(request, null)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const getHome = payload => {
  console.log('---', payload);
  const request = `/home`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const viewQuestionDetailnotification = payload => {
  console.log('---', payload);
  const request = `/view-question-notify/${payload.data}`;

  return axios
    .get(request, null)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const viewQuestionDetail = payload => {
  console.log('---', payload);
  const request = `/view-question/${payload.data}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const postQuestionResponse = async (payload, data) => {
  console.log('-----', payload, data);
  const request = baseURL + `/create-response`;
  try {
    // const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },

      body: data,
    });
    console.log('featch---', response);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error---====', error);
    throw error;
  }
};
// const postQuestionResponse1 = (payload, data) => {
//   const request = `/create-response`;

//   const header = {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${payload.Auth}`,
//     },
//   };
//   return axios
//     .post(request, data, header)
//     .then(({data, status}) => {
//       return status === 200 || status === 201 ? data : null;
//     })
//     .catch(e => {
//       throw e;
//     });
// };

const CommentQuestion = (payload, data) => {
  const request = `/comment-question`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const CommentResponse = (payload, data) => {
  const request = `/comment-response`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const LikeQuestion = (payload, data) => {
  const request = `/like-question`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const ShareResponse = (payload, data) => {
  const request = `/share-response`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const ShareQuestion = (payload, data) => {
  const request = `/share-question`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const LikeResponse = (payload, data) => {
  const request = `/like-response`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const PayTipCoin = (payload, data) => {
  const request = `/tip-coin`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
// const postQuestionResponse = (payload, data) => {
//   const request = baseURL + `/create-response`;
//   const response = fetch(request, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${payload.Auth}`,
//     },
//     body: data,
//   })
//     .then(res => {
//       const json1 = res.json();
//       const json = response.json();
//       return json1;
//     })
//     .catch(e => {
//       throw e;
//     });
// };
const postNewCoins = (payload, data) => {
  const request = `/insert-coin`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const postNewQuestion = async (payload, data) => {
  console.log('---hassan----', payload, data);
  const request = baseURL + `/create-question`;
  try {
    // const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
      body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error---====', error);
    throw error;
  }
};
// const postNewQuestion1 = (payload, data) => {
//   const request = `/create-question`;

//   const header = {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${payload.Auth}`,
//     },
//   };
//   return axios
//     .post(request, data, header)
//     .then(({data, status}) => {
//       return status === 200 || status === 201 ? data : null;
//     })
//     .catch(e => {
//       throw e;
//     });
// };

const Foryou = payload => {
  console.log('---', payload);
  const request = `/foryou`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const Trending = payload => {
  console.log('---', payload);
  const request = `/trending`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const New = payload => {
  console.log('---', payload);
  const request = `/latest`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const detailUSer = payload => {
  console.log('---', payload);
  const request = `/details`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const UserCoinDeducation = payload => {
  const request = `/user-deduct-coin`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const ViewDetail = (payload, data) => {
  console.log('---', payload);
  const request = `/view-response/${data}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const viewFileDetail = payload => {
  const request = `/coin-transfer`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const coinTransper = (payload, data) => {
  const request = `/coin-transfer`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const getCoinsAcrtiveinfo = payload => {
  console.log('---', payload);
  const request = `/user-coin-status`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const EditProfile = async payload => {
  console.log('-----', payload, payload.data);
  const request = baseURL + `/edit`;
  try {
    // const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },

      body: payload.data,
    });
    console.log('featch---', response);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error---====', error);
    throw error;
  }
};

const hide_Del = async payload => {
  console.log('---jj--', payload, payload.data);
  const request = baseURL + `/operation-question`;
  try {
    // const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Auth}`,
      },

      body: payload.data,
    });
    console.log('featch---', response);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error---====', error);
    throw error;
  }
};

const EditProfileex = payload => {
  const request = `/edit`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const updatefcm = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/update-fcm`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      console.log('-000000arish');
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const updateActivedisactive = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/change-online-status`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const OnlineNotification = payload => {
  console.log('---', payload);
  const request = `/notify-video-call`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const Onoffcheck = payload => {
  console.log('---', payload);
  const request = `/checkCoin`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};

const deleteAcc = payload => {
  console.log('---', payload);
  const request = `/delete_user`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;

  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      throw e;
    });
};
const reportVideoDetail = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/report`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const view_all_comment = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/view-comment`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const paymentFirst = payload => {
  console.log('Add tO Favrouit ', payload.data);

  const request = `/payment`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const confirm_payment = payload => {
  console.log('Add tO confirm_payment ', payload.data);

  const request = `/confirm-payment`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const BlockUser = payload => {
  console.log('Add tO confirm_payment======== ', payload);

  const request = `/block_user`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

export {
  UserCoinDeducation,
  confirm_payment,
  paymentFirst,
  checkUserName,
  view_all_comment,
  getExperties,
  registerUser,
  loginUser,
  getTopics,
  getHome,
  postNewQuestion,
  viewQuestionDetail,
  Trending,
  Foryou,
  New,
  postQuestionResponse,
  LikeResponse,
  CommentResponse,
  detailUSer,
  ViewDetail,
  CommentQuestion,
  LikeQuestion,
  postNewCoins,
  coinTransper,
  getCoinsAcrtiveinfo,
  getandCreateExperties,
  EditProfile,
  updatefcm,
  updateActivedisactive,
  OnlineNotification,
  viewQuestionDetailnotification,
  ShareQuestion,
  ShareResponse,
  EditProfileex,
  Emailverified,
  Codeverified,
  ChangePassword,
  Emailverified_signup,
  Codeverified_signup,
  hide_Del,
  viewFileDetail,
  reportVideoDetail,
  PayTipCoin,
  Onoffcheck,
  deleteAcc,
  BlockUser,
};
