import { AWS_REGION } from 'src/environments';

export const parseUrl = (bucket: string, key: string): string => {
  return `https://${bucket}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};
