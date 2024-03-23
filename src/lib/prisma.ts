export const generateQueryCondition = (
  paramName: string,
  prismaField: string,
  getParams: URL
) => {
  const paramValue = getParams.searchParams.get(paramName);
  if (paramValue !== null && paramValue !== "") {
    return {
      [prismaField]: {
        id: {
          in: paramValue.split(","),
        },
      },
    };
  }

  return {};
};
