import Footer from '@common/components/layout/Footer';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-max-width relative w-full flex-1">
      <main className="px-container pt-md pb-7xl md:mt-header-height mt-header-heightMobile md:pb-[100px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
