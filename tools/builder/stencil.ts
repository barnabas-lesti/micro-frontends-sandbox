import { type Config } from '@stencil/core';

interface OverrideConfig {
  namespace: string;
}

export function defineBaseStencilConfig(overrideConfig: OverrideConfig): Config {
  return {
    namespace: overrideConfig.namespace,
    outputTargets: [
      {
        type: 'dist',
        empty: false,
      },
    ],
  };
}
