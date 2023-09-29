import { RequestService } from './src/request/request.service';

export default function (): void {
  void RequestService.Instance;
}
