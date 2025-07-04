'use client';

import { useState } from 'react';

import Link from 'next/link';

import AiManagerIcon from '@/common/svgs/component-set/AiManagerIcon.svg';
import CheckboxSquareDisableIcon from '@/common/svgs/component-set/CheckboxSquareDisableIcon.svg';
import CheckboxSquareEnableIcon from '@/common/svgs/component-set/CheckboxSquareEnableIcon.svg';
import CopyIcon from '@/common/svgs/component-set/CopyIcon.svg';
import HumanIcon from '@/common/svgs/component-set/HumanIcon.svg';
import SnsAssistIcon from '@/common/svgs/component-set/SnsAssistIcon.svg';
import TeamMoodIcon from '@/common/svgs/component-set/TeamMoodIcon.svg';

import IconWithText from './IconWithText/IconWithText';
import { ListFileProps, ListRole } from './ListFile.types';

const roleIcon = {
  [ListRole.AI_MANAGER]: AiManagerIcon,
  [ListRole.TEAM_MOOD_MAKER]: TeamMoodIcon,
  [ListRole.SNS_ASSISTANT]: SnsAssistIcon,
} as const;

const ListFile = ({
  id,
  title,
  date,
  role,
  attendees,
  instagramLink,
  winners,
  deadline,
  isChecked,
  onCheck,
  selectionActive,
}: ListFileProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onCheck(id);
  };

  const RoleIcon = roleIcon[role as ListRole];

  const renderLeftIcon = () => {
    if (isHovered || selectionActive) {
      const CheckboxIcon = isChecked ? CheckboxSquareEnableIcon : CheckboxSquareDisableIcon;
      return (
        <div onClick={handleCheck} className="cursor-pointer">
          <CheckboxIcon width="24px" height="24px" />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center rounded-md bg-gray-600 p-1.5">
        {RoleIcon && <RoleIcon width="24px" height="24px" />}
      </div>
    );
  };

  const renderRightSideInfo = () => {
    switch (role) {
      case ListRole.SNS_ASSISTANT:
        if (instagramLink) {
          return (
            <div className="text-body-3-rg mr-10 flex cursor-pointer items-center">
              <CopyIcon width="20px" height="20px" className="mr-[1px]" />
              <a
                href={instagramLink!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-body-3-rg flex cursor-pointer items-center text-black hover:underline"
              >
                {instagramLink}
              </a>
            </div>
          );
        }
        return (
          <div className="mr-13 flex items-center gap-x-20">
            {attendees !== undefined && <IconWithText icon={HumanIcon} text={attendees} />}
            {winners !== undefined && <IconWithText icon={HumanIcon} text={winners} />}
          </div>
        );

      case ListRole.TEAM_MOOD_MAKER:
        return (
          <div className="flex items-center gap-x-20">
            {deadline && <span className="text-body-3-rg text-gray-200">{deadline}</span>}
            {attendees !== undefined && (
              <IconWithText icon={HumanIcon} text={attendees} className="mr-13" />
            )}
          </div>
        );

      case ListRole.AI_MANAGER:
      default:
        return null;
    }
  };

  return (
    <Link
      href={`/meeting/${id}`}
      className="flex w-[1030px] items-center justify-between py-4 transition-colors hover:bg-gray-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <div className="mr-2.5 flex h-9 w-9 flex-shrink-0 items-center justify-center">
          {renderLeftIcon()}
        </div>
        <div className="flex flex-col gap-y-[5px]">
          <h3 className="text-title-5-sb cursor-pointer text-black">{title}</h3>
          <p className="text-caption-2-rg text-gray-300">{date}</p>
        </div>
      </div>

      <div className="flex items-center">{renderRightSideInfo()}</div>
    </Link>
  );
};

export default ListFile;
