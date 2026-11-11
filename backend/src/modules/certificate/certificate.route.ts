import { createCrudController, createCrudRouter } from "../../utils/contentHelpers";
import { CertificateService } from "./certificate.service";

const controller = createCrudController(CertificateService, "Certificate");

export const certificateRoutes = createCrudRouter(controller, {
  hasSlugRoute: true,
  hasResetRoute: true,
});

