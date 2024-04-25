import { Button, Row } from '@lightningjs/solid-ui';
import { Accessor, Setter, Signal } from 'solid-js';

const ButtonStyle = {
  width: 200,
  height: 60,
};

type Props = {
  setCount: Setter<number>;
};

export function Counter(props: Props) {
  const setCount = props.setCount;
  return (
    <Row scroll="none">
      <Button
        autofocus
        style={ButtonStyle}
        onEnter={() => setCount((prev) => prev + 1)}
      >
        Increment
      </Button>
      <Button style={ButtonStyle} onEnter={() => setCount((prev) => prev - 1)}>
        Decrement
      </Button>
    </Row>
  );
}
