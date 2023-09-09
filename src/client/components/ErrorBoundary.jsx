import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (!this.state.errorInfo) {
      return this.props.children;
    }

    return <>Error</>;
  }
}
