import React from 'react';

import { Theme, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../state/store';
import { setValue, /*makeApiCall*/ } from '../../state/app/appState';

const useStyles = (theme: Theme) => {
    return {
  
    }
  }

function Home() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const value = useSelector((state: RootState) => state.app.value);
    const dispatch = useDispatch<AppDispatch>();

    const handleSetValue = () => {
        dispatch(setValue(1));
    }

    return (
        <>
            Home
        </>
    );
}

export default Home;
