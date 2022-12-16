import React from "react";
import GlobalHeader from "../components/GlobalHeader";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    console.error(error);
    //we can log the error into DB
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
        <GlobalHeader/>
          <img src="Error_Img.webp" style={{margin: "0 20% 0 20%"}}></img>
        </>
      );
    }
    return this.props.children;
  }
}
