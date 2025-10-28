declare module 'formidable' {
  import { IncomingMessage } from 'http';

  interface Fields {
    [key: string]: string | string[];
  }

  interface Files {
    [key: string]: File | File[];
  }

  interface File {
    size: number;
    filepath: string;
    originalFilename: string;
    mimetype: string;
    mtime: Date;
    hashAlgorithm: string;
    hash: string;
  }

  interface Options {
    multiples?: boolean;
    maxFileSize?: number;
    maxFieldsSize?: number;
    maxFields?: number;
    keepExtensions?: boolean;
    uploadDir?: string;
    encoding?: string;
    hashAlgorithm?: string;
    allowEmptyFiles?: boolean;
    minFileSize?: number;
  }

  class IncomingForm {
    constructor(options?: Options);
    parse(
      req: IncomingMessage,
      callback: (err: Error | null, fields: Fields, files: Files) => void
    ): void;
  }

  function formidable(options?: Options): IncomingForm;

  export = formidable;
}
