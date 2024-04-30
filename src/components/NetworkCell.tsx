import { Text, View } from '@lightningjs/solid';
import { rgba } from '../utils';
import { Accessor, Component, createEffect } from 'solid-js';

export function NetworkCell(props: {
  focus: boolean;
  channel: [string, number];
  y: number;
  ref: Component;
}) {
  return (
    <View
      autofocus={props.focus}
      ref={props.ref}
      style={NetworkItemStyle}
      y={props.y}
    >
      <Text style={textStyle}>{props.channel?.[0]}</Text>
      <Text style={textRightStyle}>{props.channel?.[1]}</Text>
    </View>
  );
}

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
