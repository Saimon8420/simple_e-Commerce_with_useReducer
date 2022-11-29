import './App.css';
import Home from './pages/Home/Home';
import UseReducer from './pages/Home/UseReducer';
import PatientManagement from './pages/PatientManagement/PatientManagement';

function App() {
  return (
    <div className="App">
      <UseReducer />
      <Home />
      {/* <PatientManagement /> */}
    </div>
  );
}

export default App;
