import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';

const Copyright = props => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://www.enterluck.com/">
            Enterluck Inc.
        </Link>{' '}
        {' All Rights Reserved. '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

Copyright.propTypes = {}

export default Copyright