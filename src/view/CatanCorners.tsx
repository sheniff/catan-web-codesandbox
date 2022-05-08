import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Board } from '../engine/board';
import { Hex } from '../engine/types';

interface Props {
  hexagons: Hex[];
  board: Board;
}

export class Corners extends Component<Props> {
  static contextTypes = {
    layout: PropTypes.object
  };

  render() {
    return null;
  }
}
