import { useEffect } from 'react';
import { calculationOperatorDivision } from '@/lib/exercise';

export default function Division({
  num1,
  num2,
}: {
  num1: number;
  num2: number;
}) {
  useEffect(() => {
    calculationOperatorDivision(num1, num2);
  }, []);
  return <div id="divTableMulti"></div>;
}
