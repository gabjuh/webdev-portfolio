import { useState } from 'react';
import './App.css';
import Branch from './component/Branch';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Branch />
    </div>
  );
}

export default App;
