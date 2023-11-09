import Box from '@mui/material/Box';
import Router from './Router';
import theme from './Theme'

import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <Router/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
