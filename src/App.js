// import './App.css';
// import ComplaintLogger from './components/ComplaintLogger';

// function App() {
//   return (
//     <div className="App">
//       <ComplaintLogger/>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComplaintLogger from './components/ComplaintLogger';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ComplaintLogger />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App; // Add this line to export the App component

// Remove this line, as it's not needed
// ReactDOM.render(<App />, document.getElementById('root'));