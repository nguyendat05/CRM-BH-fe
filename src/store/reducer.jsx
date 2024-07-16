const initState = {
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
      case "LOGOUT":
        return {
          ...state,
          currentUser: null,
        };
    default:
      return state;
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const storedState = localStorage.getItem("appState");
    if (storedState === null) {
      return initState;
    }
    return JSON.parse(storedState);
  } catch (error) {
    console.error("Lỗi khi tải state từ localStorage:", error);
    return initState;
  }
};

export { reducer, loadStateFromLocalStorage, initState };
