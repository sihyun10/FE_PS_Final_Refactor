import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

type ChartButtonProps = {
  dealType: string;
  year: string;
  handleDealTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleYearChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ChartButton = ({
  dealType,
  year,
  handleDealTypeChange,
  handleYearChange,
}: ChartButtonProps) => {
  return (
    <FlexDiv>
      <RadioButtonGroup>
        <RadioButtonLabel checked={dealType === 'sale'}>
          <RadioButton
            type="radio"
            value="sale"
            checked={dealType === 'sale'}
            onChange={handleDealTypeChange}
          />
          매매
        </RadioButtonLabel>
        <RadioButtonLabel checked={dealType === 'rent'}>
          <RadioButton
            type="radio"
            value="rent"
            checked={dealType === 'rent'}
            onChange={handleDealTypeChange}
          />
          전세
        </RadioButtonLabel>
      </RadioButtonGroup>
      <RadioButtonYearGroup>
        <RadioButtonYearLabel checked={year === '1'}>
          <RadioButton type="radio" value="1" checked={year === '1'} onChange={handleYearChange} />
          1년
        </RadioButtonYearLabel>
        <RadioButtonYearLabel checked={year === '3'}>
          <RadioButton type="radio" value="3" checked={year === '3'} onChange={handleYearChange} />
          3년
        </RadioButtonYearLabel>
        <RadioButtonYearLabel checked={year === '5'}>
          <RadioButton type="radio" value="5" checked={year === '5'} onChange={handleYearChange} />
          5년
        </RadioButtonYearLabel>
      </RadioButtonYearGroup>
    </FlexDiv>
  );
};

const RadioButtonGroup = styled.fieldset`
  border: none;
  display: flex;
  gap: 4px;
  width: 125px;
  height: 28px;
`;

const RadioButtonLabel = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 13px;
  font-size: 11px;
  font-weight: bold;
  color: ${(props) => (props.checked ? '#fff' : '#333')};
  background-color: ${(props) => (props.checked ? '#1a237e' : 'transparent')};
  border: ${(props) => (props.checked ? '1px solid #cfcfcf' : '1px solid #cfcfcf')};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.checked ? '#1a237e' : '#8b8b8b')};
  }

  input[type='radio'] {
    display: none;
  }
`;
const RadioButtonYearGroup = styled.fieldset`
  border: none;
  display: flex;
  border-radius: 5px;
  width: 100px;
  height: 28px;
  background-color: #e8eaf6;
`;

const RadioButtonYearLabel = styled.label<{ checked: boolean }>`
  font-size: 11px;
  padding: 1 auto;
  width: 100%;
  background-color: ${(props) => (props.checked ? '#1a237e' : '#e8eaf6')};
  color: ${(props) => (props.checked ? 'white' : 'black')};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.checked ? '#1a237e' : '#cfd8dc')};
    color: ${(props) => (props.checked ? 'white' : 'black')};
  }

  input {
    display: none;
  }
`;

const RadioButton = styled.input``;
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 450px;
`;
