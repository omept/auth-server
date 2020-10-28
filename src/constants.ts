export const __prod__ = process.env.NODE_ENV === 'production';
export const FORGOT_PASSWORD_PREFIX = "FORGOT-PASSWORD--";
export const FORGOT_PASSWORD_DURATION = 1000 * 60 * 60 * 24; // 1 millisecond * 60 secs * 60 mins * 24 hrs = 1 day in milliseconds