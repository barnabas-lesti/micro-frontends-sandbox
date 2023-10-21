export interface CustomErrorPayload<Data> {
  message: string;
  code?: string;
  data?: Data;
}
