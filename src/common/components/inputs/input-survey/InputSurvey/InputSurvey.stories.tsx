import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs';

import InputSurvey from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.client';

import { Type, Visibility } from '../types/input-survey.common.types';

const meta: Meta<typeof InputSurvey> = {
  title: 'Components/inputs/InputSurvey',
  component: InputSurvey,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputSurvey>;
export const Default: Story = {
  render: (args) => {
    const [title, setTitle] = useState<string>(args.title || '');
    const [visibility, setVisibility] = useState<Visibility>(args.visibility || Visibility.PRIVATE);
    const [type, setType] = useState<Type>(args.type || Type.CHOICE);
    const [optionList, setOptionList] = useState<string[]>(args.optionList || []);
    const [isMandatory, setIsMandatory] = useState<boolean>(args.isMandatory || false);
    const [isEtc, setIsEtc] = useState<boolean>(args.isEtc || false);
    const [description, setDescription] = useState<string>(args.description || '');

    return (
      <>
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
        <InputSurvey
          {...args}
          title={title}
          visibility={visibility}
          type={type}
          optionList={optionList}
          isMandatory={isMandatory}
          isEtc={isEtc}
          description={description}
          onTitleChange={(value) => {
            setTitle(value);
            args.onTitleChange?.(value);
            console.log('onTitleChange', value);
          }}
          onTypeChange={(value) => {
            setType(value);
            args.onTypeChange?.(value);
            console.log('onTypeChange', value);
          }}
          onOptionChange={(value) => {
            setOptionList(value);
            args.onOptionChange?.(value);
            console.log('OnOptionChange', value);
          }}
          onToggle={() => {
            setIsMandatory((prev) => !prev);
            args.onToggle?.();
            console.log('OnToggle', !isMandatory);
          }}
          onDelete={() => {
            args.onDelete?.();
            setOptionList(['']);
            setIsEtc(false);
            setDescription('');
            console.log('OnDelete called');
          }}
          onDescriptionChange={(value) => {
            setDescription(value);
            args.onDescriptionChange?.(value);
            console.log('OnDescriptionChange', value);
          }}
          onMovingBarClick={() => {
            args.onMovingBarClick?.();
            console.log('OnMovingBarClick called');
          }}
          onEtcChange={(value) => {
            setIsEtc(value);
            args.onEtcChange?.(value);
            console.log('OnEtcChange', value);
          }}
          onCheck={(value: string[]) => {
            args.onCheck?.(value);
            console.log('onCheck', value);
          }}
        />
      </>
    );
  },
  args: {
    title: '',
    placeholder: '문항의 제목을 입력하세요',
    visibility: Visibility.PRIVATE,
    optionList: [''],
    isMandatory: false,
    isEtc: false,
    description: '',
  },
};
