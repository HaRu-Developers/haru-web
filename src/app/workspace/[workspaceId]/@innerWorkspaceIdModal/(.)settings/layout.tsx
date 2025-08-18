import ModalLayout from '@common/components/layouts/ModalLayout/ModalLayout.client';
import ProfileSelectModal from '@common/components/modals/ProfileSelectModal/ProfileSelectModal.client';

const SettingsModalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* ChangePasswordModal을 중첩해 띄우기 위해 기본으로 ProfileSelectModal을 띄워둠 */}
      <ModalLayout>
        <ProfileSelectModal />
        {children}
      </ModalLayout>
    </>
  );
};

export default SettingsModalLayout;
