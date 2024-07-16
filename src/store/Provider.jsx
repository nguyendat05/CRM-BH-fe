import { useEffect } from "react";
import { useReducer } from "react";
import Context from "./Context";
import { getCurrentUserLogin, logout } from "../apis/userService";
import { loadStateFromLocalStorage, reducer } from "./reducer";

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage());

  useEffect(() => {
    const { ...stateToStore } = state;
    localStorage.setItem("appState", JSON.stringify(stateToStore));
  }, [state]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (!state.currentUser) {
          const userData = await getCurrentUserLogin();
          dispatch({ type: "SET_CURRENT_USER", payload: userData });
        }
      } catch (error) {
        console.error("Lỗi khi fetch thông tin người dùng:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}
