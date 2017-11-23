declare namespace JSX {
  interface IntrinsicElements {
      [key:string]: any
  }
}

declare module 'aframe-react' {
  import * as React from 'react';

  class Scene extends React.Component<any, any> {
  }

  class Entity extends React.Component<any, any> {
  }
}