export const isNotServiceDto = (item: any): boolean => {
  const result = ["pop", "remove", "insert", "extend", "dict"].includes(item?.type);
  return result;
};

export const isNotServiceDtoType = (data: any): boolean => {
  for (let item of data) {
    const isValid = isNotServiceDto(item);
    if (isValid) {
      return true;
    }
  }
  return false;
};
