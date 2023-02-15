import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';


export default function App({ isSignedIn, contract, wallet }) {
  const [valueNumberFromBlockchain, setValueFromBlockchain] = React.useState();
  const [messagesFromBlockchain, setMessagesFromBlockchain] = React.useState([]);
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchain state once on component load
  React.useEffect(() => {
    contract.get_number()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });

    contract.get_messages()
      .then(setMessagesFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });

  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={valueNumberFromBlockchain} onClick={() => wallet.signIn()} />;
  }

  function decreaseNumber() {
    setUiPleaseWait(true);
    contract.decrease_number()
      .then(async () => { return contract.get_number(); })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function increaseNumber() {
    setUiPleaseWait(true);
    contract.increase_number()
      .then(async () => { return contract.get_number(); })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function leaveMessage(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { messageInput } = e.target.elements;
    contract.set_message(messageInput.value)
      .then(() => {
        setMessagesFromBlockchain([...messagesFromBlockchain, { msg: messageInput.value }]);
      })
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function showMessages() {
    let msgs = messagesFromBlockchain ? messagesFromBlockchain : [];
    console.log(messagesFromBlockchain);
    return (
      <ul>
        {
          msgs.map((e, index) => (
            <li key={"msg" + index}>{e.msg}</li>
          ))
        }
      </ul>
    )
  }

  function donate(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { amountInNEAR } = e.target.elements;
    let amount = amountInNEAR.value ? amountInNEAR.value : "0.1"; //min donate 0.1 NEAR 
    contract.donate(amount)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
      <main className={uiPleaseWait ? 'please-wait' : ''}>

        <h1>
          Current Number: <span className="greeting">{valueNumberFromBlockchain}</span>
        </h1>

        <div className="box changeNumber">
          <label>Change Number:</label>

          <div className="boxNumber">
            <button onClick={decreaseNumber}>
              <span>-</span>
              <div className="loader"></div>
            </button>

            <input
              type="number"
              autoComplete="off"
              defaultValue={valueNumberFromBlockchain}
              id="number"
            />

            <button onClick={increaseNumber}>
              <span>+</span>
              <div className="loader"></div>
            </button>

          </div>
        </div>

        <br />

        <form onSubmit={leaveMessage} className="box changeMessage">
          <label>Leave a message:</label>
          <div className="leaveMessage">
            <input
              autoComplete="off"
              id="message"
              name="messageInput"
            />
            <button>
              <span>Post</span>
              <div className="loader"></div>
            </button>
          </div>
        </form>

        <div className="box">
          {showMessages()}
        </div>

        <br />

        <form onSubmit={donate} className="box" id="donate_form" >
          <input
            type="number"
            autoComplete="off"
            defaultValue={1}
            placeholder="Donate us, min 1 NEAR"
            name="amountInNEAR"
          />

          <button>
            <span>donate</span>
            <div className="loader"></div>
          </button>

        </form>

        <EducationalText />
      </main>
    </>
  );
}