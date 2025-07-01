// store/hooks.ts
import {
    useDispatch,
    useSelector,
    useStore,
    TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState, AppStore } from "./index";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<AppStore>();
