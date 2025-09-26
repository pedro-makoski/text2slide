'use client';
 
import * as React from 'react';
 
import { Counter } from '../../components/ui/shadcn-io/counter';

interface Props {
    initialValue: number 
    onSetIncrementalFn: (novoNumber: number) => void
}


const Incremental = ({onSetIncrementalFn, initialValue}: Props) => {
  const [number, setNumber] = React.useState(initialValue)

  const setNumberWithEvent = (number: number) => {
    onSetIncrementalFn(number)
    setNumber(number)
  }

  return <Counter number={number} setNumber={setNumberWithEvent}/>;
};
export default Incremental;