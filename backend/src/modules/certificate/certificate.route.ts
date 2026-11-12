import { createCrudRouter } from "../../utils/contentHelpers";
import { CertificateController } from "./certificate.controller";
import { CertificateValidation } from "./certificate.validation";

export const certificateRoutes = createCrudRouter(CertificateController, {
  hasSlugRoute: true,
  hasResetRoute: true,
  createSchema: CertificateValidation.create,
  updateSchema: CertificateValidation.update,
});
