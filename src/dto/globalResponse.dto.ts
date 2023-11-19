export class GlobalResponseDto {
  status: number;
  message: string;
  data: any;
  errors: any[];

  constructor(status: number, message: string, data: any, errors: any[]) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
}
