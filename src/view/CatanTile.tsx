import { Hexagon, HexUtils, Text } from 'react-hexgrid';
import { Tile } from '../engine/tile';
import { Hex, Resource } from '../engine/types';

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
      {/* Add things here */}
      <text
        x={0}
        y={'0.3em'}
        textAnchor="middle"
        style={{
          fill: 'white',
          fontSize: '3px'
        }}
      >{`${hex.q},${hex.r},${hex.s}`}</text>
    </Hexagon>
  );
}
