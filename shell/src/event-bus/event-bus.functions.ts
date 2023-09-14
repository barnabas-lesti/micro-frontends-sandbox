export function logFactory(method: string) {
  return <DataType>(message?: string, data?: DataType) => {
    const formattedLogMessage = `[EventBus::${method}]${message ? ' ' + message : ''}`;
    // data ? console.log(formattedLogMessage, data) : console.log(formattedLogMessage);
  };
}

export function unblockThread(callback: () => void) {
  window.setTimeout(callback, 0);
}
