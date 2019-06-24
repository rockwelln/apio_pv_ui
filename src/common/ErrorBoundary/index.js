import React, { Component } from "react";

const throttle = (fn, ms) => {
  let lastInvocationStamp = 0,
    timer;

  const finalFunction = (...args) => {
    const now = performance.now();
    const diff = now - lastInvocationStamp;

    if (diff > ms) {
      lastInvocationStamp = now;
      fn(...args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(finalFunction, ms - diff, ...args);
    }
  };

  finalFunction.cancel = () => {
    clearTimeout(timer);
  };

  return finalFunction;
};

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null
  };

  logError = throttle((error, errorInfo) => {
    if (error && errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
  }, 1000);

  componentWillUnmount() {
    this.logError.cancel();
  }

  componentDidCatch(error, errorInfo) {
    this.logError(error, errorInfo);
  }

  render() {
    console.log(this.state);
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
