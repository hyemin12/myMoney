import React from 'react';

import { AttentionIcon } from '@/assets/icons';
import { ErrorContainer } from './ErrorTemplate.style';

interface ErrorTemplateProps {
  $errorStatus?: number;
  title: string;
  content: string;
  children?: React.ReactNode;
}

function ErrorTemplate({
  $errorStatus,
  title,
  content,
  children,
}: ErrorTemplateProps) {
  return (
    <ErrorContainer $errorStatus={!!$errorStatus}>
      <AttentionIcon />
      {$errorStatus && <p className="error-status">{$errorStatus} ERROR</p>}
      <h3 className="title">{title}</h3>
      <div>
        {content.split('\\n').map((text, idx) => (
          <p className="content" key={idx}>
            {text}
          </p>
        ))}
      </div>
      {children}
    </ErrorContainer>
  );
}

export default ErrorTemplate;
