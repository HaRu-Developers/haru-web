'use client';

import Link from 'next/link';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import { TermsAgreeState } from './TermsAgreeCheckbox.types';

interface TermsAgreeCheckboxProps {
  termsAgreeState: TermsAgreeState;
  setTermsAgreeState: (state: TermsAgreeState) => void;
}

const TermsAgreeCheckbox = ({ termsAgreeState, setTermsAgreeState }: TermsAgreeCheckboxProps) => {
  const checkboxState = (state: boolean) => {
    return state
      ? CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_ENABLED
      : CheckboxIconsState.SIZE_24_SQUARE_CHECKBOX_DISABLED;
  };

  const toggleState = (key: keyof TermsAgreeState) => {
    const newTermsState = {
      ...termsAgreeState,
      [key]: !termsAgreeState[key],
    };
    setTermsAgreeState(newTermsState);
  };

  const toggleAll = () => {
    const allAgreed = Object.values(termsAgreeState).every(Boolean);
    setTermsAgreeState({
      serviceTerms: !allAgreed,
      privacyPolicy: !allAgreed,
      marketingConsent: !allAgreed,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="gap-x-6pxr flex flex-row items-center">
        <button type="button" onClick={toggleAll}>
          <CheckboxIcons
            state={checkboxState(
              termsAgreeState.marketingConsent &&
                termsAgreeState.privacyPolicy &&
                termsAgreeState.serviceTerms,
            )}
          />
        </button>
        <span className="text-cap1-md text-black">전체 동의</span>
      </div>

      <div className="gap-x-6pxr flex flex-row items-center">
        <button type="button" onClick={() => toggleState('serviceTerms')}>
          <CheckboxIcons state={checkboxState(termsAgreeState.serviceTerms)} />
        </button>
        <div>
          <Link href={ROUTES.MODAL.TERMS.SERVICE} className="text-cap1-md text-audio-bar">
            서비스이용약관
          </Link>
          <span className="text-cap1-md text-black">&nbsp;동의 (필수)</span>
        </div>
      </div>

      <div className="gap-x-6pxr flex flex-row items-center">
        <button type="button" onClick={() => toggleState('privacyPolicy')}>
          <CheckboxIcons state={checkboxState(termsAgreeState.privacyPolicy)} />
        </button>
        <div>
          <Link href={ROUTES.MODAL.TERMS.PRIVACY} className="text-cap1-md text-audio-bar">
            개인정보처리방침{' '}
          </Link>
          <span className="text-cap1-md text-black">&nbsp;동의 (필수)</span>
        </div>
      </div>

      <div className="gap-x-6pxr flex flex-row items-center">
        <button type="button" onClick={() => toggleState('marketingConsent')}>
          <CheckboxIcons state={checkboxState(termsAgreeState.marketingConsent)} />
        </button>

        <div>
          <Link href={ROUTES.MODAL.TERMS.MARKETING} className="text-cap1-md text-audio-bar">
            마케팅정보수신{' '}
          </Link>
          <span className="text-cap1-md text-black">&nbsp;동의 (선택)</span>
        </div>
      </div>
    </div>
  );
};

export default TermsAgreeCheckbox;
