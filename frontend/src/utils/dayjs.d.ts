// src/dayjs.d.ts
import 'dayjs/plugin/relativeTime';

declare module 'dayjs' {
  interface Dayjs {
    fromNow(): string;
  }
}
