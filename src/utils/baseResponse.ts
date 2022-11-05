export interface BaseResponse<T> {
  code: number;
  message: string;
  data?: T;
  path?: string;
  timestamp?: string;
}
