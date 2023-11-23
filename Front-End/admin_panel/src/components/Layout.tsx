import React from 'react';

import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
    return <Box>
        <Container maxWidth="lg" sx={{ ma: 4, mb: 4 }}>
            {children}
        </Container>
    </Box>;
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
// #endregion

export default Layout;