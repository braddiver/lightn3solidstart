import { Text, View } from '@lightningjs/solid';
import { createEffect, createSignal } from 'solid-js';
import { Button, Row } from '@lightningjs/solid-ui';

const OverviewStyle = {
  width: 900,
  height: 500,
  y: 350,
  x: 20,
  gap: 25,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flexStart',
} as const;

const ButtonStyle = {
  width: 200,
  height: 60,
};

const Title = {
  fontSize: 42,
};

const CountPage = () => {
  const [count, setCount] = createSignal(0);
  const [previousCount, setPreviousCount] = createSignal(0);

  createEffect((previous: ReturnType<typeof count>) => {
    setPreviousCount(previous);
    return count(); // Passed in as previous on next effect
  }, count()); // Initial value for previous

  return (
    <View style={OverviewStyle}>
      <Text style={Title}>Intro to solid-js: signals and side-effects</Text>
      <Text style={Title}>Count is {count()}</Text>
      <Text style={Title}>Previous count is {previousCount()}</Text>

      <Row scroll="none">
        <Button
          autofocus
          style={ButtonStyle}
          onEnter={() => setCount((prev) => prev + 1)}
        >
          Increment
        </Button>
        <Button style={ButtonStyle} onEnter={() => setCount(count() - 1)}>
          Decrement
        </Button>
      </Row>
    </View>
  );
};

export default CountPage;
