/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

interface UploadResult {
  url?: string;
  error?: UploadApiErrorResponse;
}

export async function uploads(file: string, path?: string, overwrite = false, invalidate = false): Promise<UploadResult> {
  try {
    const result = await new Promise<UploadResult>((resolve) => {
      cloudinary.v2.uploader.upload(
        file,
        {
          folder: path,
          overwrite,
          invalidate
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            resolve({ error });
          } else {
            resolve({ url: result?.secure_url });
          }
        }
      );
    });

    if (!result.url) {
      throw new Error('Invalid response from Cloudinary');
    }

    return result;
  } catch (error: any) {
    console.error('Error in uploads:', error);
    return { error };
  }
}

export function videoUpload(
  file: string,
  path?: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        folder: path,
        resource_type: 'video',
        chunk_size: 50000,
        public_id,
        overwrite,
        invalidate
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
}
