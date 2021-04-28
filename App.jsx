import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  addDigit = n => {
    const clearDisplayValue = (displayValue === '0' || clearDisplay);

    if (n === '.' && !clearDisplayValue && displayValue.includes('.'))
      return

    const currentValue = clearDisplayValue ? '' : displayValue;
    const newDisplayValue = currentValue + n;
    setDisplayValue(newDisplayValue);

    setClearDisplay(false);

    if (n !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const valuesCopy = [...values];
      valuesCopy[current] = newValue;
      setValues(valuesCopy);
    }
  }

  clearMemory = () => {
    setDisplayValue('0')
    setClearDisplay(false)
    setOperation(null)
    setValues([0, 0])
    setCurrent(0)
  }

  handleSetOperation = op => {
    if (current === 0) {
      setOperation(op)
      setCurrent(1)
      setClearDisplay(true)
    } else {
      const equals = op === '='
      const valuesCopy = [...values]

      try {
        valuesCopy[0] = eval(`${valuesCopy[0]} ${operation} ${valuesCopy[1]}`)
      } catch (e) {
        valuesCopy[0] = values[0]
      }

      valuesCopy[1] = 0
      setDisplayValue(String(valuesCopy[0]))
      setOperation(equals ? null : op)
      setCurrent(equals ? 0 : 1)
      setClearDisplay(!equals)
      setValues(valuesCopy)
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={() => handleSetOperation('/')} />
        <Button label="7" onClick={() => addDigit('7')} />
        <Button label="8" onClick={() => addDigit('8')} />
        <Button label="9" onClick={() => addDigit('9')} />
        <Button label="*" operation onClick={() => handleSetOperation('*')} />
        <Button label="4" onClick={() => addDigit('4')} />
        <Button label="5" onClick={() => addDigit('5')} />
        <Button label="6" onClick={() => addDigit('6')} />
        <Button label="-" operation onClick={() => handleSetOperation('-')} />
        <Button label="1" onClick={() => addDigit('1')} />
        <Button label="2" onClick={() => addDigit('2')} />
        <Button label="3" onClick={() => addDigit('3')} />
        <Button label="+" operation onClick={() => handleSetOperation('+')} />
        <Button label="0" double onClick={() => addDigit('0')} />
        <Button label="." onClick={() => addDigit('.')} />
        <Button label="=" operation onClick={() => handleSetOperation('=')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
