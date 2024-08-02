import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

import { IFormControlProps } from './ReviewForm';
import { UseFormGetValues } from 'react-hook-form';
import { IReview } from '../../model/review.model';

const MAX_CONTENT_LENGTH = 1000;

interface Props extends IFormControlProps {
  getValues: UseFormGetValues<IReview>;
}

function CreateContent({ setValue, getValues }: Props) {
  const [content, setContent] = useState<string>(getValues('content') ?? '');
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    setCharCount(content.replace(/(<([^>]+)>)/gi, '').trim().length);
    setValue('content', content); // react-hook-form에 값 설정
  }, [content, setValue]);

  const handleQuillChange = (value: string) => {
    if (
      value.replace(/(<([^>]+)>)/gi, '').trim().length <= MAX_CONTENT_LENGTH
    ) {
      setContent(value);
    }
  };

  return (
    <>
      <ReactQuillStyled>
        <ReactQuill
          value={content}
          style={{ width: '100%', height: '270px' }}
          modules={modules}
          onChange={handleQuillChange}
        />
      </ReactQuillStyled>
      <CharacterCount>
        {charCount}/{MAX_CONTENT_LENGTH}
      </CharacterCount>
    </>
  );
}

export default CreateContent;

const ReactQuillStyled = styled.div`
  width: 100%;
  height: 340px;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  text-align: end;
`;

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  },
};
