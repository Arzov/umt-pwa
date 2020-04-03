import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import logo from './logo.png';

const styles = ({ fontFamily, color }) => ({
	logo: {
		display: 'flex',
		alignItems: 'center',
		margin: 0,
		fontSize: 18,
		fontWeight: 'normal',
	},
	image: {
		width: '512px',
		margin: '0',
	},
});

export function LogoRenderer({ classes, children }) {
	return (
		<h1 className={classes.logo}>
			<img className={classes.image} src={logo} />
			{children}
		</h1>
	);
}

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);