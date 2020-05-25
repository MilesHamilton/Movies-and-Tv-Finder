import React, { Component } from 'react';
import './Tabs.css';

export class Tabs extends Component {
  render() {
    return (
      <div className='Tabs'>
        {React.Children.map(this.props.children, (child) => {
          return (
            <div
              onClick={() => {
                this.props.onChange(child.key);
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tabs;
