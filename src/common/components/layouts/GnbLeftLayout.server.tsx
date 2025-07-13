import GnbLeft from '@common/components/gnbs/GnbLeft/GnbLeft.server';

const GnbLeftLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen w-[1440px]">
      <GnbLeft />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default GnbLeftLayout;
