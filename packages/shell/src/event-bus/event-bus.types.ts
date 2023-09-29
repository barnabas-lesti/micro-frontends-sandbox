export type EventBusContract = {
  [key: EventBusCommand]: [unknown, unknown];
};

export interface EventBusEvent<PayloadType, ResolvedType> {
  command: string;
  promise: EventHandlerPromiseArgument<ResolvedType>;
  payload?: PayloadType;
}

export type EventBusEventHandler<PayloadType, ResolvedType> = (
  promise: EventHandlerPromiseArgument<ResolvedType>,
  payload?: PayloadType,
) => void;

export type EventBusEventListener<PayloadType> = (payload?: PayloadType) => void;

export interface EventBusEventHandlersMap<PayloadType, ResolvedType> {
  [command: string]: EventBusEventHandler<PayloadType, ResolvedType>;
}

export interface EventBusEventListenersMap<PayloadType> {
  [command: string]: EventBusEventListener<PayloadType>[];
}

export interface EventBusDispatchOptions {
  requireHandler?: boolean;
}

type EventBusCommand = string;

interface EventHandlerPromiseArgument<ResolvedType> {
  resolve: (result: ResolvedType) => void;
  reject: (reason: unknown) => void;
}
