import { app } from "./app";
import { ENV } from "./config/env";
import { prisma } from "./config/prisma";

async function bootstrap() {
  try {
    const server = app.listen(ENV.PORT, () => {
      console.log(`================================================================`);
      console.log(`  Xclusive Can Limited & Q Pail REST API Running               `);
      console.log(`  Port: http://localhost:${ENV.PORT}                            `);
      console.log(`  Health Check: http://localhost:${ENV.PORT}/health              `);
      console.log(`  API Base: http://localhost:${ENV.PORT}/api/v1                 `);
      console.log(`  Environment: ${ENV.NODE_ENV}                                  `);
      console.log(`================================================================`);
    });

    const exitHandler = () => {
      if (server) {
        server.close(async () => {
          console.log("Server closed.");
          await prisma.$disconnect();
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    };

    process.on("SIGTERM", exitHandler);
    process.on("SIGINT", exitHandler);
  } catch (error) {
    console.error("Failed to start backend server:", error);
    process.exit(1);
  }
}

bootstrap();
