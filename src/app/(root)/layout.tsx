import Footer from '@common/components/layout/Footer';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex-1">
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
