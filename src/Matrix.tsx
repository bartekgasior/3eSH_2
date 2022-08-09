import React, { useMemo } from 'react'
import { IMatrixValues } from './App';

interface IProps {
  matrixValues: IMatrixValues,
  nValue: number,
  onMatrixValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Matrix: React.FC<IProps> = ({ nValue, matrixValues, onMatrixValueChange }) => {

  const sums = useMemo(() => {

    const horizontalSums = Object.keys(matrixValues)
      .map(key => Object
        .values(matrixValues[key])
        .reduce((acc, currentValue) => (acc += (+currentValue)), 0)
      )

    const verticalSums: number[] = [];
    for (let i = 1; i <= nValue; i++) {

      let colSum = 0;
      for (let j = 1; j <= nValue; j++) {
        colSum += matrixValues[`${j}`][`${i}`]
      }
      verticalSums.push(colSum);
    }

    return {
      horizontalSums,
      verticalSums
    }
  }, [matrixValues, nValue])

  if (!nValue) return null;

  return (
    <table>
      <tbody>
        {Object.keys(matrixValues).map((key, rowKeyIDx) => {
          return <tr key={key}>

            {Object.keys(matrixValues[key]).map((cellKey) => {
              return <td key={cellKey}>

                <input
                  value={matrixValues[key][cellKey]}
                  type={'number'}
                  min={-999}
                  max={999}
                  name={`${key}_${cellKey}`}
                  onChange={e => onMatrixValueChange(e)}
                />
              </td>
            })}
            <td>{sums?.horizontalSums[rowKeyIDx]}</td>
          </tr>

        })}

        <tr>
          {sums?.verticalSums.map((verticalSum, verticalSumIDx) => <td key={verticalSumIDx}>{verticalSum}</td>)}
        </tr>
      </tbody>
    </table>
  )
}

export default Matrix