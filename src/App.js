import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(""); // Corrected: useState("") to create a state

  // ref hook
  const passwordRef = useRef(null);

  // Moved outside of passwordGenerator
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      alert('Password copied to clipboard!');
    }
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQUSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); // Corrected: str.charAt(char) uses the correct index
    }

    setPassword(pass); // Corrected: using setPassword function to update the state
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
          type="text" 
          value={password} 
          className="outline-none w-full py-1 px-3" 
          placeholder="password" 
          readOnly 
          ref={passwordRef} // Corrected ref name here
        />
        <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e) => { setLength(Number(e.target.value)); }} />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberinput" onChange={() => { setNumberAllowed((prev) => !prev); }} />
          <label>Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed} id="Characterinput" onChange={() => { setCharAllowed((prev) => !prev); }} />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
