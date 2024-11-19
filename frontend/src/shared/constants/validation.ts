import { BANNED_WORDS } from './bannedWords';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])(?!.*(.)\1\1)[A-Za-z\d!@#$%]{6,12}$/;

export const VALIDATION = {
  EMAIL: {
    required: '이메일을 입력해주세요',
    pattern: {
      value: EMAIL_REGEX,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  },
  NICKNAME: {
    required: '닉네임을 입력하세요',
    validate: (nickname: string) => {
      const containsBannedWord = BANNED_WORDS.some((word) =>
        nickname.includes(word),
      );
      return containsBannedWord
        ? '부적절한 단어가 포함되어있습니다'
        : undefined;
    },
  },
  PASSWORD_VALIDATION: {
    required: '비밀번호는 필수 입력입니다',
    minLength: {
      value: 6,
      message: '최소 6글자 이상 입력해주세요',
    },
    maxLength: {
      value: 12,
      message: '최대 12글자까지만 사용가능합니다.',
    },
    pattern: {
      value: PASSWORD_REGEX,
      message:
        '비밀번호 형식이 올바르지 않거나 동일한 문자/숫자를 연속으로 3개 이상 사용할 수 없습니다.',
    },
  },
};
