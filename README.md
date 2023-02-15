# RFC

Reanimated Fast Context

Jack Herrington's [Fast Context](https://www.youtube.com/watch?v=ZKlXqrcBx88) ([fast-context-generic example](https://github.com/jherr/fast-react-context/blob/main/fast-context-generic/src/createFastContext.tsx)), now with an additional version based on Reanimated's useSharedValue.

## Install

`npm i` or `yarn add` `@scienceartmagic/rfc react-native-reanimated`

Technically, Reanimated is only required if you want to use [`createReanimatedContext()`](https://github.com/ScienceArtMagic/RFC/blob/main/src/createReanimatedContext.tsx) (which uses [Reanimated's `useSharedValue()` hook](https://docs.swmansion.com/react-native-reanimated/docs/api/hooks/useSharedValue/) under the hood). The default export [`createFastContext()`](https://github.com/ScienceArtMagic/RFC/blob/main/src/createRefContext.tsx) (@jherr's original version with nothing but a few renamings for now), which uses [React's `useRef()` hook](https://beta.reactjs.org/reference/react/useRef) under the hood, has no other external dependencies.
