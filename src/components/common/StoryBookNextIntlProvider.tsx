import { NextIntlClientProvider } from 'next-intl';
import { generateMessages } from '@/src/utils/locale.utils';
export default function StoryBookNextIntlProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = generateMessages('ja');

  return (
    <NextIntlClientProvider messages={messages} locale="en">
      {children}
    </NextIntlClientProvider>
  );
}
