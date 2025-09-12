import React from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  currentStep?: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep = 1 }) => {
  const trans = useTranslations('');
  const steps: Step[] = [
    { number: 1, label: trans('auth.register.startRegistration') },
    { number: 2, label: trans('auth.register.verifyAccount') },
    { number: 3, label: trans('auth.register.enterInformation') },
  ];

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center py-6">
      <div className="flex items-center gap-0">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="mr-[7px] flex w-32 min-w-[128px] flex-col items-center">
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border-[1px] ${
                  step.number <= currentStep
                    ? 'border-primary text-primary'
                    : 'border-secondary text-secondary'
                }`}
              >
                {step.number < currentStep ? <Check /> : step.number}
                {index < steps.length - 1 && (
                  <div
                    className={clsx(
                      'absolute right-0 top-1/2 h-[2px] w-24 -translate-y-1/2 translate-x-full transform',
                      step.number < currentStep ? 'bg-primary' : 'bg-secondary'
                    )}
                  ></div>
                )}
              </div>

              <div
                className={`mt-1 max-w-24 whitespace-nowrap text-center text-sm font-medium sm:text-xs ${
                  step.number <= currentStep
                    ? 'text-primary'
                    : 'text-text-primary'
                }`}
              >
                {step.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
