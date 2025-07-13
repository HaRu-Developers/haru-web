import Footer from '@common/components/layouts/Footer/Footer.server';

const FooterLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-[1440px] flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default FooterLayout;
