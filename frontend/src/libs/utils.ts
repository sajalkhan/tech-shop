/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { getErrorObjFromErrorCode } from 'constants/frontend-errors';

export interface ErrorBody {
  Code: string;
  Message?: string;
  TranToken?: string;
}
export const errorResParser = (error: Error | null | undefined) => {
  if (!error) {
    return {
      Code: '0',
    };
  }
  try {
    const tranToken = (error as unknown as AxiosError<any>)?.response?.data?.SrcSystem?.TranToken;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const DestSystemResult = (error as unknown as AxiosError<any> | undefined)!.response!.data.DestSystem.Result;
    const concatedError: ErrorBody = Object.assign(DestSystemResult, { TranToken: tranToken });

    return concatedError;
  } catch {
    try {
      const errorStr = error.toString();
      window.newrelic?.addPageAction('unknownErrorHappened', { error: errorStr });
    } catch {
      window.newrelic?.addPageAction('unknownErrorHappened', { error: 'unparsable error' });
    }
    return getErrorObjFromErrorCode('99999');
  }
};
