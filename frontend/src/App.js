import React from 'react';
import Capcha from './lib/Captcha'
import appStyle from './App.module.css'

function App() {
  return (
    <div className={appStyle.background}>
      <Capcha serverURL="http://localhost:3000" />
    </div>
  );
}

export default App;
