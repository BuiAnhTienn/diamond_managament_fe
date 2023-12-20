import { privateInstance } from '@axios/axios';
import { IComment } from '@interfaces/comment.interface';

const baseComment = '/comments';

export const createComment = async ({
  content,
  // user,
  product,
}: {
  content: string;
  // user: string;
  product: string;
}) => {
  const result = await privateInstance.post(`${baseComment}/`, {
    content,
    // user,
    product,
  });
  return result.data as IComment;
};

export const getCommentByProduct = async (id: string) => {
  const result = await privateInstance.get(`${baseComment}/?product=${id}`);
  return result.data?.docs as IComment[];
};
