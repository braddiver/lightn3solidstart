import { Text, View } from '@lightningjs/solid';
import { Index, createEffect, createSignal } from 'solid-js';
import { rgba } from '../utils';

type Props = {
  channels: [string, number][];
};

export function NetworkColumn(props: Props) {
  const [channelIndex, setChannelIndex] = createSignal(0);
  const [visibleChannels, setVisibleChannels] = createSignal<Props['channels']>(
    [],
  );
  const { channels } = props;

  // Update the visible channels when the channelIndex updates
  createEffect(() => {
    let vis: typeof channels = [];
    for (let i = channelIndex(), j = 0; i < 5; i++, j++) {
      vis[j] = channels[i];
    }
    console.warn({ vis });
    setVisibleChannels(vis);
  });

  // Update the view when the visible channels updates
  const textStyle = {
    fontSize: 32,
    mountY: 0.5,
    x: 20,
    y: 35,
  };

  const textRightStyle = {
    ...textStyle,
    alpha: 0.6,
    fontSize: 32,
    wordwrap: 30,
    align: 'center', // does not work
    x: 340,
    mountY: 0.5,
    y: 35,
  };

  return (
    <View x={200} y={55}>
      <Index each={visibleChannels()}>
        {(channel, i) => (
          <View width={400} height={70} y={78 * i} color={rgba(42, 66, 66, 1)}>
            <Text style={textStyle}>{channel()[0]}</Text>
            <Text style={textRightStyle}>{channel()[1]}</Text>
          </View>
        )}
      </Index>
    </View>
  );
}
