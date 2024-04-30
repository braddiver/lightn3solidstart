import { Text, View } from '@lightningjs/solid';
import { activeElement, setActiveElement } from '@lightningjs/solid';
import { Index, createEffect, createSignal } from 'solid-js';
import { rgba } from '../utils';

type Props = {
  channels: [string, number][];
};

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
                let i = 0;
                if (prev > 0) {
                  i = prev - 1;
                }
                return i;
              });
              setChannelIndex((prev) => {
                if (prev - 1 <= 0) return 0;
                return prev - 1;
              });
            }}
            onDown={() => {
              setFocusIndex((prev: number) => {
                let i = 4;
                if (prev < 3) {
                  i = prev + 1;
                }
                return i;
              });
              setChannelIndex((prev) => {
                if (prev + 1 >= channels.length) {
                  return channels.length;
                }
                return prev + 1;
              });
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
