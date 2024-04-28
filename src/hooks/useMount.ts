import { useEffect } from "react";

// 组件加载时 运行
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  });
};

export default useMount;
