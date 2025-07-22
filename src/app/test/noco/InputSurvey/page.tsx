'use client';

import { useState } from 'react';

import InputSurvey from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.client';
import { Type, Visibility } from '@common/components/inputs/input-survey/types/input-survey.common.types';

const Page = () => {
  const [title, setTitle] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PRIVATE);
  const [type, setType] = useState<Type>(Type.CHOICE);
  const [optionList, setOptionList] = useState<string[]>(['']);
  const [isMandatory, setIsMandatory] = useState<boolean>(false);
  const [isEtc, setIsEtc] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  return (
    <div className="p-20">
      {/* 공개/비공개 스위치 */}
      <div className="gap-2pxr mb-10pxr flex flex-col">
        <span className="mr-2 text-xs font-semibold">공개 / 비공개 테스트 스위치</span>
        <label className="gap-6pxr relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            onClick={() =>
              setVisibility((prev) =>
                prev === Visibility.PRIVATE ? Visibility.PUBLIC : Visibility.PRIVATE,
              )
            }
          />
          <div className="peer peer-checked:bg-primary h-22pxr w-44pxr rounded-1000pxr after:start-2pxr after:top-2pxr after:h-18pxr after:w-18pxr after:border-stroke-200 peer-checked:after:translate-x-22pxr rtl:peer-checked:after:-translate-x-22pxr relative bg-gray-600 after:absolute after:rounded-full after:border after:bg-white after:transition-transform after:duration-200 after:content-[''] peer-checked:after:border-white"></div>
          <span className="mr-2 text-xs">
            {visibility === Visibility.PRIVATE ? '비공개' : '공개'}
          </span>
        </label>
      </div>

      {/* 설문 입력 컴포넌트 */}
      <InputSurvey
        title={title}
        visibility={visibility}
        type={type}
        optionList={optionList}
        isMandatory={isMandatory}
        isEtc={isEtc}
        description={description}
        onTitleChange={(value) => {
          setTitle(value);
          console.log('onTitleChange', value);
        }}
        onTypeChange={(value) => {
          setType(value);
          console.log('onTypeChange', value);
        }}
        onOptionChange={(value) => {
          setOptionList(value);
          console.log('onOptionChange', value);
        }}
        onToggle={() => {
          setIsMandatory((prev) => !prev);
          console.log('onToggle', !isMandatory);
        }}
        onDelete={() => {
          setOptionList(['']);
          setIsEtc(false);
          setDescription('');
          console.log('onDelete called');
        }}
        onDescriptionChange={(value) => {
          setDescription(value);
          console.log('onDescriptionChange', value);
        }}
        onMovingBarClick={() => {
          console.log('onMovingBarClick called');
        }}
        onEtcChange={(value) => {
          setIsEtc(value);
          console.log('onEtcChange', value);
        }}
        onCheck={(value: string[]) => {
          console.log('onCheck', value);
        }}
      />
    </div>
  );
};

export default Page;
