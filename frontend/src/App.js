import React, { useState } from 'react';
import Capcha from './lib/Captcha'
import appStyle from './App.module.css'

function App() {
  const [ newEmail, setNewEmail ] = useState("")
  const [ submitted, setSubmitted ] = useState(false)
  const [ showNewEmail, setShowNewEmail ] =useState(false)

  function success() {
    setShowNewEmail(true)
  }

  if (showNewEmail) {
    return <div className={appStyle.background}>
      <div className={appStyle.container}>
      <h2>Here's your new email address:</h2>
      {newEmail}@coolwebmail.com
      </div>
    </div>
  }

  if (submitted) {
    return (
      <div className={appStyle.background}>
        <Capcha onSuccess={success} serverURL="http://localhost:3000" />
      </div>
    )
  }

  return <div>
    <div className={appStyle.background}>
      <div className={appStyle.container}>
        <h2>Sign up to our cool new email service!</h2>
        <div className={appStyle.formLine}>
          <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          @coolwebmail.com
        </div>
        <div className={appStyle.submitButton} onClick={() => setSubmitted(true)}>
          Submit
        </div>
      </div>
    </div>
  </div>


}

export default App;
