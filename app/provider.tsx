"use client";

import { Provider } from "react-redux";
import { useMemo, ReactNode } from "react";
// import { makeStore } from "@/store";
import { makeStore, RootState } from '@/store';

interface ReduxProviderProps {
  children: ReactNode;
  initialReduxState?:  RootState;
}

export default function ReduxProvider({
  children,
  initialReduxState,
}: ReduxProviderProps) {
  const store = useMemo(
    () => makeStore(initialReduxState),
    [initialReduxState]
  );

  return <Provider store={store}>{children}</Provider>;
}