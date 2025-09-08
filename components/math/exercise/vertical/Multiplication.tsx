import { useEffect } from 'react';
import { calculationOperatorMultiply } from '@/lib/exercise';

export default function Multiplication({
  num1,
  num2,
}: {
  num1: number;
  num2: number;
}) {
  useEffect(() => {
    calculationOperatorMultiply(num1, num2);
  }, []);
  return <div id="divTableMulti"></div>;
}
