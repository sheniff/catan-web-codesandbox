import React from 'react';
import styled from 'styled-components';
import { CoordsToggleButton } from './view/debug/CoordsToggleButton';

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
export class Debug extends React.Component<{}, DebugData> {
  constructor(props: {}) {
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
    const StyledPanel = styled.div`
      position: fixed;
      padding: 16px;
      border: 2px dashed black;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
    `;

    const { showCoords, toggleCoords } = this.state;

    return (
      <DebugContext.Provider value={this.state}>
        {this.props.children}
        <StyledPanel>
          <CoordsToggleButton enabled={showCoords} onClick={toggleCoords} />
        </StyledPanel>
      </DebugContext.Provider>
    );
  }
}
