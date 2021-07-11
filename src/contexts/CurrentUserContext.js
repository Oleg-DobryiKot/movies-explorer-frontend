import { createContext } from 'react';

export const CurrentUserContext = createContext({
  curentUser: {},
  setCurentUser() {}, 
});
