export const imageListUrl = (page: number, limit: string): string => {
  return `${
    process.env.IMAGE_LIST_URL
      ? process.env.IMAGE_LIST_URL
      : "https://picsum.photos"
  }/v2/list?page=${page}&limit=${limit}`;
};
