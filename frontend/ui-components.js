import React from 'react';

export function SignInPrompt({greeting, onClick}) {
  return (
    <main>
      <h1>
        The contract says: <span className="greeting">{greeting}</span>
      </h1>
      <h3>
        Welcome to NEAR!
      </h3>
      <p>
        Your contract is storing in the NEAR blockchain. To
        change it you need to sign in using the NEAR Wallet. It is very simple,
        just use the button below.
      </p>
      <p>
        Do not worry, this app runs in the test network ("testnet"). It works
        just like the main network ("mainnet"), but using NEAR Tokens that are
        only for testing!
      </p>
      <br/>
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
    <button style={{ float: 'right' }} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}

export function EducationalText() {
  return (
    <>
      <p>
        Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
      </p>
      <ol>
        <li>
          Learn more about this frontend code in <code>frontend/</code> folder
        </li>
        <li>
          Ultimately, this <code>contract</code> code is defined in <code>./contract</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
        <li>
          When you run <code>npm run deploy</code>, the code in <code>./contract</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code>.</li>
      </ol>
      <hr />
      <p>
        To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
      </p>
      <p>
        This course is created by the community, for the community! <br/> Checkout <a target="_blank" rel="noreferrer" href="https://learnnear.club/">Learn NEAR Club</a> for more learning materials!
      </p>

      <p>

      </p>

    </>
  );
}
