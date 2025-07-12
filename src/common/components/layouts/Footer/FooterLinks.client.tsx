'use client';

const FooterLinks = () => {
  const handleServiceTermClick = (type: 'terms' | 'privacy') => {
    console.log(`푸터에서 ${type} 클릭됨`);
  };

  return (
    <div className="flex items-center gap-2.5">
      <span
        className="cursor-pointer hover:underline"
        onClick={() => handleServiceTermClick('terms')}
      >
        서비스이용약관
      </span>
      <span
        className="cursor-pointer hover:underline"
        onClick={() => handleServiceTermClick('privacy')}
      >
        개인정보처리방침
      </span>
    </div>
  );
};

export default FooterLinks;
