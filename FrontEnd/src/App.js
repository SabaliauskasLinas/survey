import { Suspense, Fragment, lazy } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import 'fontsource-roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import Pace from './components/Pace';

const MainComponent = lazy(() => import("./components/Main"));

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route>
              <MainComponent />
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
