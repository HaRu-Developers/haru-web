import ProtectChildren from '@features/auth/components/protect-routes/ProtectChildren/ProtectChildren.client';
import LandingFull from '@features/landing/components/LandingFull/LandingFull.client';

const LandingPage = () => {
  return (
    <ProtectChildren
      protectMode={false} // 로그인한 사용자는 접근할 수 없는 페이지
    >
      <LandingFull />
    </ProtectChildren>
  );
};

export default LandingPage;
