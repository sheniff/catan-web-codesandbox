import { Hexagon, HexUtils } from 'react-hexgrid';
import { Tile } from '../engine/tile';
import { TileCorner } from '../engine/tileHelpers';
import { Hex, Resource } from '../engine/types';
import { TileDebugLayer } from './debug/TileDebugLayer';
import { Corner } from './tile/Corner';
import { DiceNumber } from './tile/DiceNumber';

interface Props {
  hex: Hex;
  tile: Tile;
}

const colorByResource: { [index: number]: string } = {
  [Resource.Desert]: 'burlywood',
  [Resource.Clay]: 'darkred',
  [Resource.Sheep]: 'lightgreen',
  [Resource.Wheat]: 'gold',
  [Resource.Wood]: 'forestgreen',
  [Resource.Stone]: 'darkgray'
};

function getTileColor(tile: Tile) {
  const resource = tile.getResource();
  if (resource === undefined) {
    return 'black';
  }
  return colorByResource[resource] || 'black';
}

export function CatanTile({ hex, tile }: Props) {
  const key = HexUtils.getID(hex);
  return (
    <Hexagon
      key={key}
      q={hex.q}
      r={hex.r}
      s={hex.s}
      cellStyle={{ fill: getTileColor(tile) }}
    >
      <DiceNumber diceNumber={tile.getDiceNumber()} />
      <TileDebugLayer hex={hex} tile={tile} />
      {/* Corners */}
      <Corner position={TileCorner.N} />
      <Corner position={TileCorner.S} />
    </Hexagon>
  );
}
