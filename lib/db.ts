import { PrismaClient } from "@prisma/client";


    // Extend the globalThis object to include our PrismaClient instance
    declare global {
      var prismaGlobal: PrismaClient | undefined;
    }

    const prismaClientSingleton = () => {
      return new PrismaClient();
    };

    const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

    if (process.env.NODE_ENV !== 'production') {
      globalThis.prismaGlobal = prisma;
    }

    export default prisma;
