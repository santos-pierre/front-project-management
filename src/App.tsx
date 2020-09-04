import React from 'react';

const App = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-300 text-5xl font-extrabold">React.tsx</h1>
      <h1 className="text-transparent bg-clip-text bg-gradient-to-l from-teal-600 to-teal-500 text-5xl font-bold">Tailwind <span className="font-extrabold">CSS</span></h1>
    </div>
  );
}

export default App;
