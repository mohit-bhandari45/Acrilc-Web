"use client";

import { Provider } from "react-redux";
import { useMemo, ReactNode } from "react";
import { makeStore } from '@/store';

interface ReduxProviderProps {
	children: ReactNode;
}

export default function ReduxProvider({
	children,
}: ReduxProviderProps) {
	const store = useMemo(() => makeStore(), []);
	return <Provider store={store}>{children}</Provider>;
}