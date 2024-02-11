import PropTypes from 'prop-types';

export default function Notificalion({ message }) {
  return <p>{message}</p>;
}

Notificalion.propTypes = {
  message: PropTypes.string.isRequired,
};
