import { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        };

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.defauld });
                });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.prop} /> : null;
        }
    };
};

export default asyncComponent;