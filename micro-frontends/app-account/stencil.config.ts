import { type Config } from '@stencil/core';

export const config: Config = {
  namespace: 'app-account',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
  ],
};
