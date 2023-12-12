import { useState } from 'react'
import './App.css'
import InputForm from './components/InputForm'
import ResultDisplay from './components/ResultDisplay'
import PrintButton from './components/PrintButton'

function App() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <InputForm setResult={setResult} />
      {result && <ResultDisplay result={result} />}
      <PrintButton />
    </div>
  );
}

export default App
