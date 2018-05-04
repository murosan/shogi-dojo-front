import * as React from 'react';
import { UserInfo } from '../../modules/types';

type Value = string | number | UserInfo;

interface Props {
  options: Array<Value>;
  default: Value;
  extraClassName: string;
  htmlTabIndex: number;
  value: (v: Value) => void;
}

interface State {
  checked: Value;
}

export default class Selector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { checked: props.default };
  }

  render() {
    return (
      <div className={`selectorWrap ${this.props.extraClassName}`}>
        <div className={'selector'} {...{ tabIndex: this.props.htmlTabIndex }}>
          {this.renderOptions()}
        </div>
      </div>
    );
  }

  renderOptions() {
    return this.props.options.map((v, i) => {
      return (
        <div
          key={`option_${Math.random()}_${i}`}
          className={this.state.checked === v ? 'option checked' : 'option'}
          onClick={() => this.updateState(v)}
        >
          {typeof v === 'string' || typeof v === 'number' ? v : v.userName}
        </div>
      );
    });
  }

  updateState(v: Value) {
    this.setState({ checked: v });
    this.props.value(v);
    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      active.blur();
    }
  }
}
