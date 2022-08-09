import React, { useState } from 'react'
import Matrix from './Matrix';
import './App.css';

const MAX_N_VALUE = 15;

type MatrixRowValue = {
  [key: string]: number
}

export interface IMatrixValues {
  [key: string]: MatrixRowValue
}

const getRandomNumber = (from = 1, to = 999) => (Math.floor(Math.random() * to) + from);

const getMatrixValues = (nValue: number, prevMatrixValues: IMatrixValues): IMatrixValues => {
  let values: IMatrixValues = {};

  for (let i = 1; i <= nValue; i++) {
    values[`${i}`] = {};
    for (let j = 1; j <= nValue; j++) {
      values[`${i}`][`${j}`] = 0;
    }
  }

  Object.keys(values).forEach(rowKey => {

    Object.keys(values[rowKey]).forEach(colKey => {
      values[rowKey][colKey] = prevMatrixValues[rowKey] ? prevMatrixValues[rowKey][colKey] ?? getRandomNumber() : getRandomNumber();
    })

  })

  return values;
}

const App = () => {
  const [nValue, setNValue] = useState(0);
  const [matrixValues, setMatrixValues] = useState<IMatrixValues>({});

  const onMainInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (typeof nValue !== 'number' || (+value > MAX_N_VALUE)) return;
    setNValue(+value);
    setMatrixValues(prevMatrixValues => getMatrixValues(+value, prevMatrixValues));
  }

  const handleNValueButtonChange = (isIncrement = true) => {
    if ((nValue === 0 && !isIncrement) || (nValue === MAX_N_VALUE && isIncrement)) return;
    const newNValue = +nValue + (isIncrement ? 1 : -1);

    setNValue(newNValue);
    setMatrixValues(prevMatrixValues => getMatrixValues(newNValue, prevMatrixValues));
  }

  const onMatrixValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (typeof nValue !== 'number' || (+value > 999)) return;

    const [i, j] = name.split('_');

    setMatrixValues(prevValues => ({
      ...prevValues,
      [i]: {
        ...prevValues[i],
        [j]: +value
      }
    }))

  }

  return (
    <main>
      <button onClick={() => handleNValueButtonChange(false)}>-</button>
      <input
        value={nValue}
        onChange={e => onMainInputChange(e)}
        min={0}
        max={MAX_N_VALUE}
        type={'number'}
      />
      <button onClick={() => handleNValueButtonChange(true)}>+</button>

      {nValue && <Matrix
        nValue={nValue}
        matrixValues={matrixValues}
        onMatrixValueChange={onMatrixValueChange}
      />}
    </main>
  )
}

export default App