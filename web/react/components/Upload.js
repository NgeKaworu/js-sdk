import React, { forwardRef, useState } from 'react';
import { Upload, Icon } from 'antd';

export default forwardRef(
  (
    {
      value,
      placeholder,
      onChange,
      fileHandler = () => {},
      prefix,
      ...restProps
    },
    ref,
  ) => {
    const [getImgUrl, setImgUrl] = useState(value);

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>{placeholder}</div>
      </div>
    );

    return (
      <Upload
        value={value}
        ref={ref}
        customRequest={async ({ file, onProgress, onError, onSuccess }) => {
          try {
            onProgress(0);
            const url = await fileHandler(file);
            onProgress(100);
            onSuccess({
              url,
            });
            onChange(url);
            setImgUrl(url);
          } catch (e) {
            onError(e);
          }
        }}
        {...restProps}
      >
        {getImgUrl ? (
          <img
            src={`${prefix}${getImgUrl}`}
            alt="avatar"
            style={{ width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  },
);
