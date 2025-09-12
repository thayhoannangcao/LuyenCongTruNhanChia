import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';
import CardInfo from '../CardInfo/CardInfo';

export default {
  title: 'Common/Carousel',
  component: Carousel,
} as Meta<typeof Carousel>;
const data = [
  {
    content: <CardInfo title={'1'} />,
  },
  {
    content: <CardInfo title={'2'} />,
  },
  {
    content: <CardInfo title={'3'} />,
  },
  {
    content: <CardInfo title={'4'} />,
  },
  {
    content: <CardInfo title={'5'} />,
  },
  {
    content: <CardInfo title={'6'} />,
  },
  {
    content: <CardInfo title={'7'} />,
  },
  {
    content: <CardInfo title={'8'} />,
  },
  {
    content: <CardInfo title={'9'} />,
  },
  {
    content: <CardInfo title={'10'} />,
  },
  {
    content: <CardInfo title={'11'} />,
  },
  {
    content: <CardInfo title={'12'} />,
  },
  {
    content: <CardInfo title={'13'} />,
  },
  {
    content: <CardInfo title={'14'} />,
  },
  {
    content: <CardInfo title={'15'} />,
  },
  {
    content: <CardInfo title={'16'} />,
  },
  {
    content: <CardInfo title={'17'} />,
  },
  {
    content: <CardInfo title={'18'} />,
  },
  {
    content: <CardInfo title={'19'} />,
  },
];
export const CarouselCommon: StoryObj<typeof Carousel> = {
  render() {
    return <Carousel items={data} classNameContent="w-[500px]" />;
  },
};
