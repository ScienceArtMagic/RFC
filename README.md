# RFC

Reanimated Fast Context

Jack Herrington's [Fast Context](https://www.youtube.com/watch?v=ZKlXqrcBx88) ([fast-context-generic example](https://github.com/jherr/fast-react-context/blob/main/fast-context-generic/src/createFastContext.tsx)), now with an additional version based on Reanimated's useSharedValue.

As of v0.1.0, calling the returned `useFastContext` hook of `createFastContext`/`createReanimatedContext` without an argument results in a default selector of `(store) => store` (in other words, "selects" the entire object you supplied to initialize createFastContext).

## Install

`npm i` or `yarn add` `@scienceartmagic/rfc react-native-reanimated`

Technically, Reanimated is only required if you want to use [`createReanimatedContext()`](https://github.com/ScienceArtMagic/RFC/blob/main/src/createReanimatedContext.tsx) (which uses [Reanimated's `useSharedValue()` hook](https://docs.swmansion.com/react-native-reanimated/docs/api/hooks/useSharedValue/) under the hood). The default export [`createFastContext()`](https://github.com/ScienceArtMagic/RFC/blob/main/src/createRefContext.tsx) (not far from @jherr's original version), which uses [React's `useRef()` hook](https://beta.reactjs.org/reference/react/useRef) under the hood, has no other external dependencies.
