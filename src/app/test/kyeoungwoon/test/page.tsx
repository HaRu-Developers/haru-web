'use client';
const page = () => {
  return (
    <div onClick={() => alert('부모 클릭됨!')}>
      <a
        href="https://example.com"
        // onClick={(e) => e.stopPropagation()}
      >
        링크
      </a>
    </div>
  );
};

export default page;
