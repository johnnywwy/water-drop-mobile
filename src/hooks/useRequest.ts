import { useCallback, useState } from "react";
import useMount from "./useMount";

/**
 * 1、实现组件初始化，发送请求，并处理响应数据
 * 2、手动触发请求
 * @param service
 * @param params
 * @returns
 */

interface IOptions {
  params: Record<string, string>;
  manual: boolean;
  onSuccess?: (res: unknown) => void;
  onError?: (err: Error) => void;
}
const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions,
) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  const init = useCallback(
    (curParams: Record<string, string>) => {
      // 请求数据
      setLoading(true);
      service(curParams)
        .then((res) => {
          // 处理数据
          setLoading(false);
          setData(res);
          options.onSuccess && options.onSuccess(res);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [service],
  );

  const run = (runParams: Record<string, string>) => {
    init(runParams);
  };

  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  return { data, loading, run };
};

export default useRequest;
