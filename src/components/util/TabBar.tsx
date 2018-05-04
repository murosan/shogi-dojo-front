import * as React from 'react';

interface Props {
  displayIndex: number;
  pageNames: Array<string>;
  changeTabIndex: (i: number) => void;
}

export default class TabBar extends React.Component<Props, {}> {
  render() {
    const tabs = this.props.pageNames.map((name, index) => {
      const clsName =
        index === this.props.displayIndex ? 'tab tabFocus' : 'tab tabHidden';
      return (
        <div
          key={`tab${index + 1}`}
          className={clsName}
          onClick={() => this.props.changeTabIndex(index)}
        >
          {name}
        </div>
      );
    });
    return <div className={'tabBar'}>{tabs}</div>;
  }
}
