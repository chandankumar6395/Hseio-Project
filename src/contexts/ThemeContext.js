import React, { useEffect } from 'react';

import { THEMES } from '../constants';

const initialState = {
  theme: THEMES.DEFAULT,
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme) => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const [theme, _setTheme] = React.useState(initialState.theme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      _setTheme(JSON.parse(storedTheme));
    }
  }, []);

  const setTheme = (theme) => {
    localStorage.setItem('theme', JSON.stringify(theme));
    _setTheme(theme);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
