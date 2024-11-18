import PropTypes from 'prop-types';

// Define prop types for the FontAwesome component
const FontAwesomePropTypes = {
    name: PropTypes.string.isRequired, // The name of the icon
};

// Define the FontAwesome component
export default function FontAwesome({ name, ...rest }) {
    // Render an <i> element with Font Awesome classes
    return <i {...rest} className={`fa fa-${name}`} />;
};

// Assign prop types to the component
FontAwesome.propTypes = FontAwesomePropTypes;
