import { View, Text } from '@lightningjs/solid';
import { NetworkColumn } from '../components/NetworkColumn';

function createSign(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const channels: [string, number][] = [
  ['ABC', 7],
  ['BOS', 8],
  ['CNN', 9],
  ['DIY', 10],
  ['ESPN', 11],
  ['FAR', 12],
  ['GUT', 13],
  ['HIT', 14],
  ['ICE', 15],
  ['JK', 16],
];

for (let i = 0; i < 1005; i++) {
  channels.push([createSign(3), i + 17]);
}

const GridPage = () => {
  const OverviewContainer = {
    width: 1920,
    height: 500,
  } as const;

  return (
    <View style={OverviewContainer}>
      <NetworkColumn channels={channels}></NetworkColumn>
    </View>
  );
};

export default GridPage;
