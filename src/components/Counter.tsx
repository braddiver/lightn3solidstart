import { Button, Row } from '@lightningjs/solid-ui';
import { createEffect, createSignal } from 'solid-js';

const ButtonStyle = {
  width: 200,
  height: 60,
};

export function Counter(props) {
  const [count, setCount] = createSignal(0);
  const [previousCount, setPreviousCount] = createSignal(0);

  createEffect((previous: ReturnType<typeof count>) => {
    setPreviousCount(previous);
    return count(); // Passed in as previous on next effect
  }, count()); // Initial value for previous

  return (
    <Row scroll="none">
      <Button
        autofocus
        style={ButtonStyle}
        onEnter={() =>
          props.setCount((prev: ReturnType<typeof props.count>) => prev + 1)
        }
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
