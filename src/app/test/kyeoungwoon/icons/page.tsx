import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';
import ArrowIcons from '@icons/ArrowIcons/ArrowIcons';
import { ArrowIconsState } from '@icons/ArrowIcons/ArrowIcons.types';
import AudioBarIcons from '@icons/AudioBarIcons/AudioBarIcons';
import { AudioBarIconsState } from '@icons/AudioBarIcons/AudioBarIcons.types';
import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';
import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';
import DownloadIcons from '@icons/DownloadIcons/DownloadIcons';
import { DownloadIconsState } from '@icons/DownloadIcons/DownloadIcons.types';
import EyeIcons from '@icons/EyeIcons/EyeIcons';
import { EyeIconsState } from '@icons/EyeIcons/EyeIcons.types';
import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';
import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';
import IndicatorIcons from '@icons/IndicatorIcons/IndicatorIcons';
import { IndicatorIconsState } from '@icons/IndicatorIcons/IndicatorIcons.types';
import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';
import LeftGnbIcons from '@icons/LeftGnbIcons/LeftGnbIcons';
import { LeftGnbIconsState } from '@icons/LeftGnbIcons/LeftGnbIcons.types';
import LogoIcons from '@icons/LogoIcons/LogoIcons';
import { LogoIconsState } from '@icons/LogoIcons/LogoIcons.types';
import OnboardingIcons from '@icons/OnboardingIcons/OnboardingIcons';
import { OnboardingIconsState } from '@icons/OnboardingIcons/OnboardingIcons.types';
import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';
import ProfileDropdownIcons from '@icons/ProfileDropdownIcons/ProfileDropdownIcons';
import { ProfileDropdownIconsState } from '@icons/ProfileDropdownIcons/ProfileDropdownIcons.types';
import SpeakerIcons from '@icons/SpeakerIcons/SpeakerIcons';
import { SpeakerIconsState } from '@icons/SpeakerIcons/SpeakerIcons.types';

const KyeoungwoonTestPage = () => {
  return (
    <>
      <div className="text-t1-sb">AiQuestionIcon</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <AiQuestionIcons state={AiQuestionIconsState.SIZE_18} />
        <AiQuestionIcons state={AiQuestionIconsState.SIZE_20} />
        <AiQuestionIcons state={AiQuestionIconsState.SIZE_20_HOVER} />
        <AiQuestionIcons state={AiQuestionIconsState.SIZE_24} />
      </div>

      <div className="text-t1-sb">ArrowIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <ArrowIcons state={ArrowIconsState.LEFT} />
        <ArrowIcons state={ArrowIconsState.RIGHT} />
      </div>

      <div className="text-t1-sb">AudioBarIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <AudioBarIcons state={AudioBarIconsState.PAUSE} />
        <AudioBarIcons state={AudioBarIconsState.PLAY} />
        <AudioBarIcons state={AudioBarIconsState.START_RECORDING} />
        <AudioBarIcons state={AudioBarIconsState.STOP_RECORDING} />
      </div>

      <div className="text-t1-sb">CheckboxIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <CheckboxIcons state={CheckboxIconsState.CIRCLE_CHECKBOX_DISABLED} />
        <CheckboxIcons state={CheckboxIconsState.CIRCLE_CHECKBOX_ENABLED} />
        <CheckboxIcons state={CheckboxIconsState.SQUARE_CHECKBOX_DISABLED} />
        <CheckboxIcons state={CheckboxIconsState.SQUARE_CHECKBOX_ENABLED} />
      </div>

      <div className="text-t1-sb">CrossIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <CrossIcons state={CrossIconsState.SIZE_16_GRAY_200} />
        <CrossIcons state={CrossIconsState.SIZE_16_GRAY_400} />
        <CrossIcons state={CrossIconsState.SIZE_24_GRAY_200} />
      </div>

      <div className="text-t1-sb">DownloadIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <DownloadIcons state={DownloadIconsState.DOWNLOAD_BLACK} />
        <DownloadIcons state={DownloadIconsState.DOWNLOAD_WHITE} />
        <DownloadIcons state={DownloadIconsState.FILE_DOWNLOAD_PDF} />
        <DownloadIcons state={DownloadIconsState.FILE_DOWNLOAD_WORD} />
      </div>

      <div className="text-t1-sb">EyeIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <EyeIcons state={EyeIconsState.CLOSED} />
        <EyeIcons state={EyeIconsState.OPENED} />
      </div>
      <div className="text-t1-sb">FeaturedFileIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_16_AI_MANAGER_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_16_SNS_ASSISTANT_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_16_TEAM_MOOD_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_20_AI_MANAGER_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_20_SNS_ASSISTANT_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_20_TEAM_MOOD_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_24_AI_MANAGER_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_24_SNS_ASSISTANT_FILE} />
        <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_24_TEAM_MOOD_FILE} />
      </div>

      <div className="text-t1-sb">FeatureTabIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <FeatureTabIcons state={FeatureTabIconsState.COPY} />
        <FeatureTabIcons state={FeatureTabIconsState.EDIT} />
        <FeatureTabIcons state={FeatureTabIconsState.LINK} />
      </div>

      <div className="text-t1-sb">IndicatorIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <IndicatorIcons state={IndicatorIconsState.BAR_STEP_1} />
        <IndicatorIcons state={IndicatorIconsState.BAR_STEP_2} />
        <IndicatorIcons state={IndicatorIconsState.BAR_STEP_3} />
        <IndicatorIcons state={IndicatorIconsState.CIRCLE_DISABLED} />
        <IndicatorIcons state={IndicatorIconsState.CIRCLE_ENABLED} />
      </div>

      <div className="text-t1-sb">IndividualIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <IndividualIcons state={IndividualIconsState.CALENDAR} />
        <IndividualIcons state={IndividualIconsState.CONGRATULATE_SIGN_UP} />
        <IndividualIcons state={IndividualIconsState.GROUP} />
        <IndividualIcons state={IndividualIconsState.SEARCH} />
        <IndividualIcons state={IndividualIconsState.UNDER_ARROW} />
        <IndividualIcons state={IndividualIconsState.UPLOAD} />
        <IndividualIcons state={IndividualIconsState.WARNING} />
      </div>

      <div className="text-t1-sb">LeftGnbIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <LeftGnbIcons state={LeftGnbIconsState.AI_MANAGER} />
        <LeftGnbIcons state={LeftGnbIconsState.AI_MANAGER_DISABLED} />
        <LeftGnbIcons state={LeftGnbIconsState.HOME} />
        <LeftGnbIcons state={LeftGnbIconsState.HOME_DISABLED} />
        <LeftGnbIcons state={LeftGnbIconsState.MY_CALENDAR} />
        <LeftGnbIcons state={LeftGnbIconsState.MY_CALENDAR_DISABLED} />
        <LeftGnbIcons state={LeftGnbIconsState.RECENT_FILE} />
        <LeftGnbIcons state={LeftGnbIconsState.SNS_ASSISTANT} />
        <LeftGnbIcons state={LeftGnbIconsState.SNS_ASSISTANT_DISABLED} />
        <LeftGnbIcons state={LeftGnbIconsState.TEAM_MOOD_TRACKER} />
        <LeftGnbIcons state={LeftGnbIconsState.TEAM_MOOD_TRACKER_DISABLED} />
      </div>

      <div className="text-t1-sb">LogoIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <LogoIcons state={LogoIconsState.MIXED} />
        <LogoIcons state={LogoIconsState.SYMBOL} />
        <LogoIcons state={LogoIconsState.TEXT} />
      </div>

      <div className="text-t1-sb">OnboardingIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <OnboardingIcons state={OnboardingIconsState.CALENDAR} />
        <OnboardingIcons state={OnboardingIconsState.CHECK} />
        <OnboardingIcons state={OnboardingIconsState.EVENT} />
        <OnboardingIcons state={OnboardingIconsState.MEETING} />
        <OnboardingIcons state={OnboardingIconsState.MOOD_TRACKER} />
      </div>

      <div className="text-t1-sb">PlusIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <PlusIcons state={PlusIconsState.SIZE_16_GRAY_300} />
        <PlusIcons state={PlusIconsState.SIZE_16_PRIMARY} />
        <PlusIcons state={PlusIconsState.SIZE_16_SECONDARY_BLUE} />
        <PlusIcons state={PlusIconsState.SIZE_16_SECONDARY_GREEN} />
        <PlusIcons state={PlusIconsState.SIZE_20_GRAY_400} />
        <PlusIcons state={PlusIconsState.SIZE_20_PRIMARY} />
        <PlusIcons state={PlusIconsState.SIZE_20_SECONDARY_BLUE} />
        <PlusIcons state={PlusIconsState.SIZE_20_SECONDARY_GREEN} />
        <PlusIcons state={PlusIconsState.SIZE_24} />
      </div>

      <div className="text-t1-sb">ProfileDropdownIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <ProfileDropdownIcons state={ProfileDropdownIconsState.ADD_PROFILE} />
        <ProfileDropdownIcons state={ProfileDropdownIconsState.LOGOUT} />
        <ProfileDropdownIcons state={ProfileDropdownIconsState.PROFILE} />
      </div>

      <div className="text-t1-sb">SpeakerIcons</div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <SpeakerIcons state={SpeakerIconsState.USER_1} />
        <SpeakerIcons state={SpeakerIconsState.USER_2} />
        <SpeakerIcons state={SpeakerIconsState.USER_3} />
        <SpeakerIcons state={SpeakerIconsState.USER_4} />
        <SpeakerIcons state={SpeakerIconsState.USER_5} />
        <SpeakerIcons state={SpeakerIconsState.USER_6} />
        <SpeakerIcons state={SpeakerIconsState.USER_7} />
      </div>
    </>
  );
};

export default KyeoungwoonTestPage;
