import { useEffect } from 'react';
import { calculationOperatorAddAndSub } from '@/lib/exercise';

export default function Subtraction({
  num1,
  num2,
}: {
  num1: number;
  num2: number;
}) {
  useEffect(() => {
    calculationOperatorAddAndSub(num1, num2, '-');
  }, []);
  return <div id="divTableMulti"></div>;
}
