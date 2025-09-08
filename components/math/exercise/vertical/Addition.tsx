import { useEffect } from 'react';
import { calculationOperatorAddAndSub } from '@/lib/exercise';

export default function Addition({
  num1,
  num2,
  handleSubmit,
}: {
  num1: number;
  num2: number;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  useEffect(() => {
    calculationOperatorAddAndSub(num1, num2, '+');
  }, []);
  return <div id="divTableMulti"></div>;
}
