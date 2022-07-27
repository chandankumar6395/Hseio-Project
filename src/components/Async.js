import * as React from 'react';

import Loader from './Loader';

const sleep = (m) =>
  new Promise((r) => {
    setTimeout(r, m);
  });

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      await sleep(process.env.NODE_ENV === 'development' ? 150 : 0);

      const { default: component } = await importComponent();

      this.setState({
        component,
      });
    }

    render() {
      const { component: C } = this.state;

      return C ? <C {...this.props} /> : <Loader />;
    }
  }

  return AsyncComponent;
}
