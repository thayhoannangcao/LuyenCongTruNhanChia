import * as React from 'react';
import type { StoryObj } from '@storybook/react';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button/Button';
import toast from './Toast';
import { ToastContainer } from 'react-toastify';
import Avatar from '../Avatar/Avatar';
export default {
  title: 'Common/Toast',
};
export const ToastBase: StoryObj<typeof toast> = {
  render: () => {
    const handleClick = () => {
      toast({
        title: <b>Blank tost!</b>,
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastBaseDescription: StoryObj<typeof toast> = {
  render: () => {
    const handleClick = () => {
      toast({
        title: <b>Blank tost!</b>,
        description: 'Helper text here.',
      });
    };
    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastSuccess: StoryObj<typeof toast> = {
  render: () => {
    const handleClick = () => {
      toast({
        type: 'success',
        title: <b>Successfully toasted!</b>,
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};

export const ToastSuccessDescription: StoryObj<typeof toast> = {
  render() {
    const handleClick = () => {
      toast({
        type: 'success',
        title: <b>Successfully toasted!</b>,
        description: 'Helper text here.',
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastError: StoryObj<typeof toast> = {
  render() {
    const handleClick = () => {
      toast({
        type: 'error',
        title: "This didn't work",
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastErrorDescription: StoryObj<typeof toast> = {
  render() {
    const handleClick = () => {
      toast({
        type: 'error',
        title: "This didn't work.",
        description: 'Helper text here.',
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastLoading: StoryObj<typeof toast> = {
  render() {
    const handleClick = () => {
      toast({
        type: 'loading',
        title: 'Loading...',
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastLoadingDescription: StoryObj<typeof toast> = {
  render() {
    const handleClick = () => {
      toast({
        type: 'loading',
        title: 'Loading...',
        description: 'Helper text here.',
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastInfo: StoryObj<typeof toast> = {
  render() {
    const handleClick = () => {
      toast({
        type: 'info',
        title: (
          <>
            <Avatar />
            <div className="flex grow flex-col">
              <b>John Doe</b> <div> Sure! 8:30pm works great</div>
            </div>
          </>
        ),
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
export const ToastInfoDescription: StoryObj<typeof toast> = {
  render() {
    const handleClick = () => {
      toast({
        type: 'info',
        title: (
          <>
            <Avatar />
            <div className="flex grow flex-col">
              <b>John Doe</b>
              <div> Sure! 8:30pm works great</div>
            </div>
          </>
        ),
        description: 'Helper text here.',
      });
    };

    return (
      <>
        <Button onClick={handleClick}>Show Toast</Button>
        <ToastContainer />
      </>
    );
  },
};
