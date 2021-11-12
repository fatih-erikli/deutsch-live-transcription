import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;

    const recognition = new SpeechRecognition();
    const grammar = new SpeechGrammarList();
    grammar.addFromString(`
      #JSGF V1.0;
      <greeting>= (guten tag) {hi};
    `);
    const speechRecognitionList = new SpeechGrammarList();
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = "de-DE";

    recognition.onresult = function (event) {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setResults([finalTranscript || interimTranscript]);
    };

    recognition.start();
  }, []);
  return (
    <div className="app-container">
      Deutsch Live Transcription
      <br />
      {results.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
    </div>
  );
}

export default App;
