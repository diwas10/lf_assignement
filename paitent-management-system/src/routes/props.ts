import React from 'react';

export interface RouteProperties {
  path: string;
  element: React.ComponentType<any>;
  children?: RouteProperties[];
  // permissions?: IPermissions
}
