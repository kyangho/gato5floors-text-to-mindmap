import Flow from '@/components/Mindmap';
import { demoCallApi } from '@/redux/features/demo';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  const handleCallApi = useCallback(async () => {
    const { payload } = await dispatch(demoCallApi());

    console.log(payload);
  }, []);

  useEffect(() => {
    handleCallApi();
  });
  return <Flow />;
}
