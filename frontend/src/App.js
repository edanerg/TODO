import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from './components/tasks';
import ToolBar from './components/toolBar';
import UserCard from './components/userCard';
import store from './store';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <LoadingBar style={{zIndex: "2000", height: '5px'}}/>
      <ToolBar/>
      <div className="App">
        <UserCard />
        <Tasks />
      </div>
    </Provider>
  );
}

export default App;
