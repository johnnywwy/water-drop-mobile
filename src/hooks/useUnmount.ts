import { useEffect } from "react";
import useLatest from "./useLatest";

// 组件加载时 运行
const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  fnRef.current = fn;
  useEffect(() => fnRef.current?.(), []);

  // useEffect(() => () => fn?.(), []);
};

export default useUnmount;
