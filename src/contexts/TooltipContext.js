import { createContext } from 'react';

export const TooltipContext = createContext({
    message: null,
    setMessage() {},
});
