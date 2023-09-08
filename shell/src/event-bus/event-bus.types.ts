export type TypedFunctionCallback<T> = (payload: T) => void;

export const enum ReplayType {
  'none' = 'none',
  'latest' = 'latest',
  'all' = 'all',
}

export const enum SystemCommand {
  'nolistener' = 'nolistener',
  'nobuffer' = 'nobuffer',
}

export interface EventBusParams {
  isDebugEnabled?: boolean;
}

/**
 * Event bus options
 * @argument replay - in case listener needs to react on already dispatched events use replay latest or all
 */
export interface EventBusOptions {
  replay?: ReplayType;
}

export interface Listener<T> {
  id: string;
  callback: T;
}
