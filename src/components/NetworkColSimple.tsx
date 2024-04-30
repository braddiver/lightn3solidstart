import { View } from '@lightningjs/solid';
import { Component, createEffect, createSignal } from 'solid-js';
import { NetworkCell } from './NetworkCell';

type Props = {
  channels: [string, number][];
};

export function NetworkColSimple(props: Props) {
  const [channelIndex, setChannelIndex] = createSignal(0);
  const [focusIndex, setFocusIndex] = createSignal(0);
  const { channels } = props;

  // Set the channel for each row
  const [row1, setRow1] = createSignal<[string, number]>(['', 0]);
  const [row2, setRow2] = createSignal<[string, number]>(['', 0]);
  const [row3, setRow3] = createSignal<[string, number]>(['', 0]);
  const [row4, setRow4] = createSignal<[string, number]>(['', 0]);
  const [row5, setRow5] = createSignal<[string, number]>(['', 0]);

  let ref1!: Component;
  let ref2!: Component;
  let ref3!: Component;
  let ref4!: Component;
  let ref5!: Component;
  // Update the visible channels when the channelIndex updates
  createEffect(() => {
    const i = channelIndex();
    setRow1(channels[i]);
    setRow2(channels[i + 1]);
    setRow3(channels[i + 2]);
    setRow4(channels[i + 3]);
    setRow5(channels[i + 4]);
  });

  createEffect(() => {
    const i = focusIndex();
    return i;
    // How do you set focus on a ref???
    // if (i === 0) ref1?.focus();
    // if (i === 1) ref2?.focus();
    // if (i === 2) ref3?.focus();
    // if (i === 3) ref4?.focus();
    // if (i === 4) ref5?.focus();
  });

  return (
    <View
      style={ColumnStyle}
      onUp={(arg) => {
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
      onDown={(arg) => {
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
      <NetworkCell
        focus={focusIndex() === 0}
        ref={ref1}
        channel={row1()}
        y={78}
      />
      <NetworkCell
        focus={focusIndex() === 1}
        ref={ref2}
        channel={row2()}
        y={78 * 2}
      />
      <NetworkCell
        focus={focusIndex() === 2}
        ref={ref3}
        channel={row3()}
        y={78 * 3}
      />
      <NetworkCell
        focus={focusIndex() === 3}
        ref={ref4}
        channel={row4()}
        y={78 * 4}
      />
      <NetworkCell
        focus={focusIndex() === 4}
        ref={ref5}
        channel={row5()}
        y={78 * 5}
      />
    </View>
  );
}

const ColumnStyle = {
  x: 200,
  y: 55,
};
