import { Text, View } from '@lightningjs/solid';
import { Index, createEffect, createSignal } from 'solid-js';

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
  return (
    <View y={100}>
      <Index each={visibleChannels()}>
        {(channel, i) => (
          <View width={400} height={70} y={100 * i} color={0xaaddcc}>
            <Text style={{ fontSize: 32 }} mountY={0.5} y={35}>
              {channel()?.[0]}: {channel()?.[1]}
            </Text>
          </View>
        )}
      </Index>
    </View>
  );
}
