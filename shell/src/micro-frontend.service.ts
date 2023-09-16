export interface MicroFrontendService {
  registerSubscriptions?(): void;
  initialize?(): void;
  destroy?(): void;
}
