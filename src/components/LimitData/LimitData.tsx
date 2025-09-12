import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ILimitDataProps {
  content: string;
  limit: number;
  className?: string;
}

function LimitData({ content, limit, className }: Readonly<ILimitDataProps>) {
  const trans = useTranslations();
  const [isShow, setIsShow] = useState(false);

  const isContentLong = content.length > limit;

  return (
    <div className={className}>
      {isContentLong && !isShow ? (
        <div>
          <span className="whitespace-pre-wrap">{content.slice(0, limit)}</span>
          <button
            className="mt-2 flex items-center gap-2 px-[9px] py-1 text-[13px] font-medium text-primary"
            onClick={() => setIsShow(true)}
          >
            {trans('common.seeMore')}
            <ChevronDown />
          </button>
        </div>
      ) : (
        <div>
          <span className="whitespace-pre-wrap">{content}</span>
          {isContentLong && (
            <button
              className="mt-2 flex items-center gap-2 px-[9px] py-1 text-[13px] font-medium text-primary"
              onClick={() => setIsShow(false)}
            >
              {trans('common.seeLess')}
              <ChevronUp />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default LimitData;
