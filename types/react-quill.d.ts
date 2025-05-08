declare module 'react-quill' {
  import React from 'react';

  export interface ReactQuillProps {
    value?: string;
    onChange?: (content: string) => void;
    modules?: any;
    formats?: string[];
    theme?: string;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
  }

  const ReactQuill: React.ForwardRefExoticComponent<ReactQuillProps>;
  export default ReactQuill;
}
