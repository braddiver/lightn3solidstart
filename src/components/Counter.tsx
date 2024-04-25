import { Button, Row } from '@lightningjs/solid-ui';
import { Accessor, Setter, createEffect, createSignal } from 'solid-js';

const ButtonStyle = {
  width: 200,
  height: 60,
};

type Props = {
  count: Accessor<number>;
  setCount: Setter<number>;
};

export function Counter(props: Props) {
  return (
    <Row scroll="none">
      <Button
        autofocus
        style={ButtonStyle}
        onEnter={() => props.setCount((prev: number) => prev + 1)}
      >
        Increment
      </Button>
      <Button
        style={ButtonStyle}
        onEnter={() => props.setCount(props.count() - 1)}
      >
        Decrement
      </Button>
    </Row>
  );
}
