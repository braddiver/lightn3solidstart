import { useNavigate } from '@solidjs/router';
import { View } from '@lightningjs/solid';
import { useFocusManager, useAnnouncer } from '@lightningjs/solid-primitives';
import { rgba } from '../utils/index.ts';

const App = (props) => {
  useFocusManager({
    Announcer: ['a'],
    Menu: ['m'],
    Text: 't',
    Buttons: 'b',
    Count: 'c',
    Grid: 'g',
    Escape: ['Escape', 27],
    Backspace: ['Backspace', 8],
    Left: ['ArrowLeft', 37],
    Right: ['ArrowRight', 39],
    Up: ['ArrowUp', 38],
    Down: ['ArrowDown', 40],
    Enter: ['Enter', 13],
  });

  const navigate = useNavigate();
  const announcer = useAnnouncer();
  announcer.debug = false;
  announcer.enabled = false;
  return (
    <View
      ref={window.APP}
      onAnnouncer={() => (announcer.enabled = !announcer.enabled)}
      onLast={() => history.back()}
      onCount={() => navigate('/count')}
      onGrid={() => navigate('/grid')}
      onText={() => navigate('/text')}
      onButtons={() => navigate('/buttons')}
      onMenu={() => navigate('/')}
    >
      <View color={rgba(119, 119, 119)} />
      {props.children}
    </View>
  );
};

export default App;
