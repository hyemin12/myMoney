import { useRef } from 'react';
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { Input } from '@/components/common';
import { CancelIcon, ISearchForm } from '@/pages/Search';
import { MagnifyingGlassIcon, CloseIcon } from '@/assets/icons';

interface SearchInputBoxProps {
  onSubmit: (data: ISearchForm) => void;
  handleSubmit: UseFormHandleSubmit<{ query: string }>;
  register: UseFormRegister<ISearchForm>;
  handleCancelSearch: () => void;
  watch: UseFormWatch<ISearchForm>;
}

function SearchInputBox({
  handleCancelSearch,
  onSubmit,
  handleSubmit,
  register,
  watch,
}: SearchInputBoxProps) {
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const [searchParams] = useSearchParams();

  const searchQueryValue = watch('query');

  console.log(searchQueryValue);
  return (
    <StickyContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Button type="submit" ref={buttonRef} />
          <SearchIcon
            onClick={() => {
              if (buttonRef.current !== null) {
                buttonRef.current.click();
              }
            }}
          >
            <MagnifyingGlassIcon />
          </SearchIcon>

          {searchQueryValue.length > 0 && (
            <CancelIcon onClick={handleCancelSearch}>
              <CloseIcon />
            </CancelIcon>
          )}

          <StyledInput
            defaultValue={String(searchParams.get('query') || '')}
            $inputType="text"
            {...register('query', { required: true })}
            type="text"
            placeholder="검색어를 입력해주세요"
          />
        </Fieldset>
      </Form>
    </StickyContainer>
  );
}

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  margin-bottom: 28px;
`;

const Form = styled.form``;

const Fieldset = styled.fieldset`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
  height: 40px;
  padding-left: 50px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: none;
`;

const SearchIcon = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  svg {
    width: 24px;
    height: 24px;
  }
`;

export default SearchInputBox;
