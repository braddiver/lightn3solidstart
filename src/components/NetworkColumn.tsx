import { Text, View } from '@lightningjs/solid';
import { For, Index, createEffect, createSignal } from 'solid-js';
import { rgba } from '../utils';
import { useFocusManager } from '@lightningjs/solid-primitives';

const ColumnStyle = {
  x: 200,
  y: 55,
};

const NetworkItemStyle = {
  width: 400,
  height: 70,
  color: rgba(42, 66, 66, 1),
  focus: {
    color: rgba(22, 46, 56),
  },
};

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

type Props = {
  channels: [string, number][];
};
let scrollCount = 0;

export function NetworkColumn(props: Props) {
  const [channelIndex, setChannelIndex] = createSignal(0);
  const [focusIndex, setFocusIndex] = createSignal(0);
  const [visibleChannels, setVisibleChannels] = createSignal<Props['channels']>(
    [],
  );
  const { channels } = props;

  // Update the visible channels when the channelIndex updates
  createEffect(() => {
    let vis: typeof channels = [];
    for (let i = channelIndex(), j = 0; j < 5; i++, j++) {
      vis[j] = channels[i];
    }
    console.warn({ vis });
    setVisibleChannels(vis);
  });

  useFocusManager({
    Up: ['ArrowUp', 38],
    Down: ['ArrowDown', 40],
  });

  function isAutoFocus(index: number) {
    const result = focusIndex() === index;
    if (result) {
      console.warn('focus!', focusIndex());
    }
    return result;
  }

  return (
    <View style={ColumnStyle}>
      <Index each={visibleChannels()}>
        {(channel, i) => (
          <View
            autofocus={isAutoFocus(i)}
            style={NetworkItemStyle}
            y={78 * i}
            onUp={() => {
              setFocusIndex((prev: number) => {
                if (prev >= 0) return 0;
                const indx = prev - 1;
                console.warn('up', { focusIndex: indx });
                return indx;
              });
              setChannelIndex((prev) => prev - 1);
            }}
            onDown={() => {
              setFocusIndex((prev: number) => {
                if (prev >= 4) return 4;
                const indx = prev + 1;
                console.warn('down', { focusIndex: indx });
                return indx;
              });
              setChannelIndex((prev) => prev + 1);
            }}
          >
            <Text style={textStyle}>{channel()[0]}</Text>
            <Text style={textRightStyle}>{channel()[1]}</Text>
          </View>
        )}
      </Index>
    </View>
  );
}
