import Link from 'next/link';

const KyeoungWoonLayout = ({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h1>Kyeoungwoon Test Field</h1>
      {/* <nav>
        <Link href="#">Open modal</Link>
      </nav> */}
      <div>{modal}</div>
      <div>{children}</div>
    </>
  );
};

export default KyeoungWoonLayout;
