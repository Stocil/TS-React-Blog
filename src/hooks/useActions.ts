import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { rootActions } from "../store/rootActions.ts";
import { bindActionCreators } from "@reduxjs/toolkit";

export function useActions() {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
}
