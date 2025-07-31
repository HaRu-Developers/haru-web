import GnbLeft from '@common/components/gnbs/GnbLeft/GnbLeft.client';

const GnbLeftLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-1">
      <GnbLeft />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default GnbLeftLayout;
