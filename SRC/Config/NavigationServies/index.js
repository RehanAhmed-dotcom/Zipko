import React, {createRef} from 'react';
const navigationRef = createRef();
const navigate = (name, par) => {
  navigationRef.current?.navigate(name, par);
};
const push = name => {
  navigationRef.current?.push(name);
};
export {push, navigate, navigationRef};
