import React from 'react';
import styled from 'styled-components';

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

    const StyledButton = styled.button`
      background: ${(props: { enabled: boolean }) =>
        props.enabled ? 'black' : 'transparent'};
      border-radius: 3px;
      border: 2px solid
        ${(props: { enabled: boolean }) => (props.enabled ? 'white' : 'black')};
      color: ${(props: { enabled: boolean }) =>
        props.enabled ? 'white' : 'black'};
      margin: 0 1em;
      padding: 0.25em 1em;
    `;

    const { showCoords, toggleCoords } = this.state;

    return (
      <DebugContext.Provider value={this.state}>
        <StyledPanel>
          <StyledButton enabled={showCoords} onClick={toggleCoords}>
            Coords
          </StyledButton>
        </StyledPanel>
        {this.props.children}
      </DebugContext.Provider>
    );
  }
}
