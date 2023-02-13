# RFC

Reanimated Fast Context

Jack Herrington's Fast Context, now with an additional version based on Reanimated's useSharedValue.

## Install

`npm i` or `yarn add` `@scienceartmagic/rfc react-native-reanimated`

Technically, Reanimated is only required if you want to use `createReanimatedContext` (which uses Reanimated's `useSharedValue()` hook under the hood). The default export `createFastContext` (@jherr's original version), which uses React's `useRef()` under the hood, has no other external dependencies.
