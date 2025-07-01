import Footer from '@common/components/layout/Footer';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
