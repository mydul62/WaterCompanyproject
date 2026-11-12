import { createCrudController } from "../../utils/contentHelpers";
import { CaseStudyService } from "./caseStudy.service";

export const CaseStudyController = createCrudController(CaseStudyService, "Case study");

