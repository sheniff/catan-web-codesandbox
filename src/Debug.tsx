import React from 'react';

interface DebugData {
  showCoords: boolean;
  toggleCoords: () => void;
}

const debug: DebugData = {
  showCoords: false,
  toggleCoords: () => {}
};

export const DebugContext = React.createContext(debug);

/**
 * Panel to show debug options and listen to keystrokes
 * to enable, disable them as well.
 *
 * TODO :)
 * - shift + c => toggle coords
 * - Create a debug panel
 */
export class Debug extends React.Component<void, DebugData> {
  constructor(props: void) {
    super(props);

    // What's this? Read: https://reactjs.org/docs/context.html
    const toggleCoords = () => {
      this.setState((state) => ({
        showCoords: !state.showCoords
      }));
    };

    this.state = {
      ...debug,
      toggleCoords
    };
  }

  render() {
    return (
      <DebugContext.Provider value={this.state}>
        {/* TODO: Create a debug panel here */}
        {this.props.children}
      </DebugContext.Provider>
    );
  }
}
