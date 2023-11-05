import { useRef, useEffect } from 'react';

type Callback = () => void;

export const useEffectOnce = (callback: Callback) => {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (!calledOnce.current) {
      callback();
      calledOnce.current = true;
    }
  }, [callback]);
};
