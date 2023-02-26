import { useState } from 'react';
import './App.css';
import CvTree from './component/CvTree';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CvTree />
    </div>
  );
}

export default App;
