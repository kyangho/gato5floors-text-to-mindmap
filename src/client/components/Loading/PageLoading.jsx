import React, { memo } from 'react';
import Lottie from 'lottie-react-web';
import whileload from '@/assets/Lottie/whileload.json';
import './PageLoading.module.less';

const PageLoading = memo(() => (
  <div className="modal-container modal-container-white">
    <Lottie
      width={80}
      height={80}
      options={{
        render: 'canvas',
        animationData: whileload
      }}
    />
  </div>
));

export default PageLoading;
