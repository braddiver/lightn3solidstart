import { Text } from '@lightningjs/solid';
import styles from '../styles';

const HelloWorld = () => {
  return (
    <>
      <Text autofocus style={styles.headlineText}>
        Hello World!
      </Text>
      <Text style={styles.headlineSubText}>
        Press G for Grid, C for Counter, B for Buttons, T for Text, M for Hello
        World
      </Text>
    </>
  );
};

export default HelloWorld;
