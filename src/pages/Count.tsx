import { Text, View } from '@lightningjs/solid';
import { createSignal } from 'solid-js';
import { Row, Button } from '@lightningjs/solid-ui';

const CountPage = () => {
  const OverviewContainer = {
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

  const [count, setCount] = createSignal(0);

  return (
    <View style={OverviewContainer}>
      <Text style={Title}>Title of the Page</Text>
      <Text style={Title}>Count is {count()}</Text>
      <Row scroll="none">
        <Button autofocus onEnter={() => setCount((prev) => prev + 1)}>
          Increment
        </Button>
        <Button onEnter={() => setCount((prev) => prev - 1)}>Decrement</Button>
      </Row>
    </View>
  );
};

export default CountPage;
