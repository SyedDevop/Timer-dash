export interface ConsoleApi {
  get: {
    query: {
      gpio: string;
    };
    response: {
      id: string;
      name: string;
      gpio: string;
      windowsId: string;
    }[];
  };
  post: {
    body?: {
      name: string;
      gpio: string;
      windowsId: string;
    };
    response: {
      status: number;
      message: string;
    };
  };
}

export interface ResponseError {
  error: {
    status: string;
    message: string[];
  };
}
