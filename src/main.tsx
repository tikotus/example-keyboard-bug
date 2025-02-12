import React, { useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

function App() {
  // Initialize state using hooks
  const [layoutName, setLayoutName] = useState("default");
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const keyboardRef = useRef(null);

  const setInputCaretPosition = useCallback((elem, pos) => {
    if (elem && elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);
    }
  }, []);

  const onChange = useCallback(inputValue => {
    const caretPosition = keyboardRef.current?.caretPosition ?? null;
    setInput(inputValue);
    if (caretPosition !== null) {
      setInputCaretPosition(inputRef.current, caretPosition);
    }
    console.log("Input changed", inputValue, caretPosition);
  }, [setInputCaretPosition]);

  const handleShift = useCallback(() => {
    setLayoutName(curr => (curr === "default" ? "shift" : "default"));
  }, []);

  const onKeyPress = useCallback(button => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  }, [handleShift]);

  const onChangeInput = useCallback(event => {
    const value = event.target.value;
    setInput(value);
    keyboardRef.current?.setInput(value);
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        value={input}
        onBlur={e => console.log("Foo")}
        placeholder="Tap on the virtual keyboard to start"
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={r => (keyboardRef.current = r)}
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
        useButtonTag={true}
        preventMouseDownDefault={true}
      />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
