//Components
import Router from './Router';
import theme from './Theme'

//Mui, separate path imports to ensure optimal load time
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';

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
