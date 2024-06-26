import { ElementNode, Text, View } from '@lightningjs/solid';
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
  const refs: ElementNode[] = [];
  const { channels } = props;

  createEffect(() => {
    // When channelIndex changes, update the visible channels
    const index = channelIndex();
    setVisibleChannels(channels.slice(index, index + 5));
  });

  createEffect(() => {
    // When focus index changes, focus the element
    const i = focusIndex();
    if (refs[i] !== undefined) {
      refs[i].setFocus();
    }
  });

  function onUp() {
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
  }

  function onDown() {
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
  }

  return (
    <View style={ColumnStyle} onUp={onUp} onDown={onDown}>
      <Index each={visibleChannels()}>
        {(channel, i) => (
          <View
            autofocus={i === 0}
            ref={refs[i]}
            style={NetworkItemStyle}
            y={78 * i}
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
  contain: 'both', // Must be used in conjuction with textAlign
  textAlign: 'right',
  x: 340,
  width: 30,
  mountY: 0.5,
  y: 35,
};
