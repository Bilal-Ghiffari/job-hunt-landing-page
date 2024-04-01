import { Prisma } from "@prisma/client";

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

type PrismaWhereInputJob = Prisma.JobWhereInput;
type PrismaWhereInputCompany = Prisma.CompanyWhereInput;

// interface ConditionBuilder {
//   (search: string | null, location: string | null):
//     | PrismaWhereInputJob[]
//     | PrismaWhereInputCompany[];
// }

// export const generateQuerySearch = (
//   search: string | null,
//   location: string | null,
//   type: "job" | "company"
// ): PrismaWhereInputJob | PrismaWhereInputCompany => {
//   const conditionJob: PrismaWhereInputJob[] = [];
//   const conditionCompany: PrismaWhereInputCompany[] = [];
//   let locationCondition;
//   if (search && search?.length > 0) {
//     locationCondition =
//       type === "company"
//         ? conditionCompany.push({
//             Companyoverview: {
//               every: {
//                 name: { startsWith: search ?? "", mode: "insensitive" },
//               },
//             },
//           })
//         : conditionJob.push({
//             roles: {
//               startsWith: search ?? "",
//               mode: "insensitive",
//             },
//           });
//   }

//   if (location && location.length > 0) {
//     locationCondition =
//       type === "job"
//         ? conditionJob.push({
//             Company: {
//               Companyoverview: {
//                 every: { location: location ?? "" },
//               },
//             },
//           })
//         : conditionCompany.push({
//             Companyoverview: {
//               every: { location: location ?? "" },
//             },
//           });
//   }

//   if (type === "company") {
//     if (conditionCompany.length > 0) {
//       return {
//         OR: conditionCompany,
//         AND: conditionCompany,
//       }
//     } else {
//       return {};
//     }
//   } else if (type === "job") {
//     if (conditionJob.length > 0) {
//       return {
//         OR: conditionJob,
//         AND: conditionJob,
//       }
//     } else {
//       return {};
//     }
//   }
// };
type PrismaWhereInput = Prisma.JobWhereInput | Prisma.CompanyWhereInput;

export const generateRolesCondition = (
  search: string | null,
  location: string | null
): Prisma.JobWhereInput | {} => {
  if (search?.length!! > 0 || location?.length!! > 0) {
    const conditions: (Prisma.JobWhereInput | Prisma.CompanyWhereInput)[] = [];

    if (search) {
      conditions.push({
        roles: {
          startsWith: search,
          mode: "insensitive",
        },
      });
    }

    if (location) {
      conditions.push({
        Company: {
          Companyoverview: {
            every: {
              location: location,
            },
          },
        },
      });
    }

    return {
      OR: conditions,
      AND: conditions,
    };
  } else {
    return {};
  }
};
