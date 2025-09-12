import clsx from 'clsx';

interface ICardInfoProps {
  title: string;
  children?: string | React.ReactNode;
  className?: string;
  variant?: 'primary' | 'no-line';
}

const CardInfo = ({
  title,
  children,
  className,
  variant = 'primary',
}: ICardInfoProps) => {
  return (
    <div
      className={clsx(
        'bg rounded-[10px] bg-white px-6 py-3 text-text-primary shadow-card-primary',
        className
      )}
    >
      <p
        className={clsx(
          'text-xl font-bold leading-8',
          variant === 'primary' && 'border-b border-divider py-3'
        )}
      >
        {title}
      </p>
      <div className="py-3">{children}</div>
    </div>
  );
};

export default CardInfo;
