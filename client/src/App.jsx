// //import logo from './logo.svg';
//  import './App.css';
// import BarChart from './components/Chart/BarChart.jsx';
// //import Login from './Pages/Login.jsx';
// // import { useState } from 'react';
// import Login from './Pages/Login';
// //import BarchartContainer from './BarchartContainer';

// function App() {
  
//   return (
//     <div className="App">
//       <BarChart datasetUrl="./dataset/cancer.csv"/>
//       {/* <BarchartContainer datasetUrl="./dataset/cancer.csv"/>  */}
// <Login />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import BarChart from './components/Chart/BarChart';
import Login from './Pages/Login';

function App() {
  return (    
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<BarChart datasetUrl="./dataset/sampledata.csv" />} />
    </Routes>
  );
}

export default App;

