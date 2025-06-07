'use server';

import { cookies } from 'next/headers';
import { defaultLocale, Locale } from './config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, { expires });
}
