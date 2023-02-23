import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react'
import { useSharedValue } from 'react-native-reanimated'

interface ProviderProps<Store> {
  children: React.ReactNode
  value: Store
}

export function createReanimatedContext<Store>(
  initialData: Store,
): [
  Provider: React.ComponentType<ProviderProps<Store>>,
  useFastContext: <SelectorOutput>(
    selector: (store: Store) => Store | SelectorOutput,
  ) => [Store | SelectorOutput, (value: Partial<Store>) => void],
] {
  function useReanimatedData(initialData: Store): {
    get: () => Store
    set: (value: Partial<Store>) => void
    subscribe: (callback: () => void) => () => void
  } {
    const store = useSharedValue(initialData)

    const get = useCallback(() => store.value, [])

    const subscribers = useRef(new Set<() => void>())

    const set = useCallback((value: Partial<Store>) => {
      store.value = { ...store.value, ...value }
      subscribers.current.forEach((callback) => callback())
    }, [])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])

    return {
      get,
      set,
      subscribe,
    }
  }

  type UseStoreDataReturnType = ReturnType<typeof useReanimatedData>

  const Context = createContext<UseStoreDataReturnType | null>(null)
  function Provider({ children }: { children: React.ReactNode }) {
    return (
      <Context.Provider value={useReanimatedData(initialData)}>
        {children}
      </Context.Provider>
    )
  }
  function useReanimatedContext<SelectorOutput>(
    selector?: (store: Store) => Store | SelectorOutput,
  ): [Store | SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(Context)
    if (!store) {
      throw new Error(
        'Store not found. Are you calling this inside a createReanimatedContext Provider?',
      )
    }

    const selectorFn = selector ? selector : (store: Store) => store

    const state = useSyncExternalStore(store.subscribe, () =>
      selectorFn(store.get()),
    )

    return [state, store.set]
  }
  return [Provider, useReanimatedContext]
}
