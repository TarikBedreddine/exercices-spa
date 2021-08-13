import * as ε from '../tools/ε/';

// import components
import Header from './Header';

class App extends ε.Component {

  render() {
    return ε.createElement(
      'div',
      {},
      [
        ε.createElement(Header, {}, [])
      ]
    );
  }
}

export default App;