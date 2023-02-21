import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react'

interface ProviderProps<Store> {
  children: React.ReactNode
  value: Store
}

export function createRefContext<Store>(
  initialData: Store,
): [
  Provider: React.ComponentType<ProviderProps<Store>>,
  useFastContext: <SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ) => [Store | SelectorOutput, (value: Partial<Store>) => void],
] {
  function useStoreData(initialData: Store): {
    get: () => Store
    set: (value: Partial<Store>) => void
    subscribe: (callback: () => void) => () => void
  } {
    const store = useRef(initialData)

    const get = useCallback(() => store.current, [])

    const subscribers = useRef(new Set<() => void>())

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value }
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

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>

  const Context = createContext<UseStoreDataReturnType | null>(null)
  function Provider({ children }: { children: React.ReactNode }) {
    return (
      <Context.Provider value={useStoreData(initialData)}>
        {children}
      </Context.Provider>
    )
  }

  function useFastContext<SelectorOutput>(
    selector: (store: Store) => Store | SelectorOutput = (store) => store,
  ): [Store | SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(Context)
    if (!store) {
      throw new Error(
        'Store not found. Are you calling this inside a createFastContext Provider?',
      )
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get()),
    )

    return [state, store.set]
  }
  return [Provider, useFastContext]
}
