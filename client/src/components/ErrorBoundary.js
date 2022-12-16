import React from 'react';
import GlobalHeader from '../components/GlobalHeader';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    console.error(error);
    console.error(info);
    //we can log the error into DB
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <GlobalHeader />
          <img src="Error_Img.webp" style={{ margin: '0 20% 0 20%' }}></img>
        </>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.any
};
