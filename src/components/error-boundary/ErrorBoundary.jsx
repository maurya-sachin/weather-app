import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
          <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
            <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
            <p className="mt-2 text-gray-200">
              Something went wrong. Please try refreshing the page.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Validate that children is a valid React node
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
