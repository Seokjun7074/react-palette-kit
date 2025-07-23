import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </div>
  );
}

export default App;
