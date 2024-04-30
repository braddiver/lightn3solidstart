import { ElementNode, Text, View } from '@lightningjs/solid';
import { activeElement, setActiveElement } from '@lightningjs/solid';
import { Component, Index, createEffect, createSignal } from 'solid-js';
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
  const refs: ElementNode[] = [];
  const { channels } = props;

  createEffect(() => {
    // When channelIndex changes, update the visible channels
    let vis: typeof channels = [];
    for (let i = channelIndex(), j = 0; j < 5; i++, j++) {
      vis[j] = channels[i];
    }
    console.warn({ vis });
    setVisibleChannels(vis);
  });

  createEffect(() => {
    // When focus index changes, focus the element
    const i = focusIndex();
    if (refs[i] !== undefined) {
      setActiveElement(refs[i]);
    }
  });

  return (
    <View autofocus style={ColumnStyle}>
      <Index each={visibleChannels()}>
        {(channel, i) => (
          <View
            autofocus={i === 0}
            ref={refs[i]}
            style={NetworkItemStyle}
            y={78 * i}
            onUp={() => {
              setChannelIndex((prev) => {
                let next = prev;
                if (focusIndex() === 0 && prev > 0) {
                  next = prev - 1;
                }
                return next;
              });
              setFocusIndex((prev: number) => {
                let i = 0;
                if (prev > 0) {
                  i = prev - 1;
                }
                return i;
              });
            }}
            onDown={() => {
              setChannelIndex((prev) => {
                let next = prev;
                if (focusIndex() === 4 && prev + 1 < channels.length) {
                  next = prev + 1;
                }
                return next;
              });
              setFocusIndex((prev: number) => {
                let i = 4;
                if (prev < 3) {
                  i = prev + 1;
                }
                return i;
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
