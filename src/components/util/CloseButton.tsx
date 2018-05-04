import * as React from 'react';

interface Props {
  clicked: () => void;
}

export default class ButtonClose extends React.Component<Props, {}> {
  render() {
    return (
      <svg className="btnClose" onClick={() => this.props.clicked()}>
        <line x1="10%" y1="10%" x2="90%" y2="90%" />
        <line x1="90%" y1="10%" x2="10%" y2="90%" />
      </svg>
    );
  }
}
