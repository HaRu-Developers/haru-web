import GnbLeft from '@common/components/gnbs/GnbLeft/GnbLeft.server';

import { GnbLeftLayoutProps } from './GnbLeftLayout.types';

const GnbLeftLayout = ({ children, workspaceId }: Readonly<GnbLeftLayoutProps>) => {
  const formattedWorkspaceId = workspaceId ? Number(workspaceId) : null;
  return (
    <div className="flex flex-1">
      <GnbLeft workspaceId={formattedWorkspaceId} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default GnbLeftLayout;
