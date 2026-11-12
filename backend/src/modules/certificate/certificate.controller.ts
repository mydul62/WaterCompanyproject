import { createCrudController } from "../../utils/contentHelpers";
import { CertificateService } from "./certificate.service";

export const CertificateController = createCrudController(CertificateService, "Certificate");

