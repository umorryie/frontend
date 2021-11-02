export const imageListUrl = (page: number, limit: number): string => {
  return `${
    process.env.IMAGE_LIST_URL
      ? process.env.IMAGE_LIST_URL
      : "https://picsum.photos"
  }/v2/list?page=${page}&limit=${limit}`;
};
