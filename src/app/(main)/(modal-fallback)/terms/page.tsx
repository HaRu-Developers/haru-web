import TermsModalPage from '../../@modal/(.)terms/page';

// 새로고침이나 직접 접근 시에도 TermsModalPage를 재활용
const TermsStandalonePage = () => {
  return <TermsModalPage />;
};

export default TermsStandalonePage;
