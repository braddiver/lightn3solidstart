import { Text, View } from '@lightningjs/solid';
import { createEffect, createSignal } from 'solid-js';
import { Counter } from '../components/Counter';

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

const Title = {
  fontSize: 42,
};

const CountPage = () => {
  const [count, setCount] = createSignal(0);
  const [previousCount, setPreviousCount] = createSignal(0);

  createEffect((previous: ReturnType<typeof count>) => {
    setPreviousCount(previous);
    return count(); // Passed to createEffect next time
  }, count()); // Initial value for previous

  return (
    <View style={OverviewStyle}>
      <Text style={Title}>Intro to solid-js: signals and side-effects</Text>
      <Text style={Title}>Count is {count()}</Text>
      <Text style={Title}>Previous count is {previousCount()}</Text>

      <Counter setCount={setCount}></Counter>
    </View>
  );
};

export default CountPage;
