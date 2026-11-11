export interface JobOpening {
  id: string;
  title: string;
  department: string;
  facility: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  badgeColor: string;
  isActive?: boolean;
  order?: number;
}

export const JOB_DEPARTMENTS = [
  "Quality Assurance",
  "Production & Tooling",
  "Engineering & Maintenance",
  "Sales & Commercial",
  "Supply Chain & Logistics",
];

export const JOB_BADGE_OPTIONS = [
  { label: "Blue (Quality)", value: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Emerald (Production)", value: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { label: "Purple (Tooling)", value: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Amber (Commercial)", value: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Cyan (Automation)", value: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { label: "Indigo (Supply Chain)", value: "bg-indigo-50 text-indigo-700 border-indigo-200" },
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "JOB-QA-01",
    title: "Senior Quality Assurance Engineer (Cleanroom & Water Jars)",
    department: "Quality Assurance",
    facility: "Kaliakoir Plant, Latifpur-B",
    location: "Kaliakoir-1750, Gazipur",
    type: "Full-Time",
    experience: "4 - 7 Years",
    summary:
      "Lead food-grade quality verification, statistical process control (SPC), and BSTI / HACCP regulatory audits across pure water dispenser bottle and food-grade plastic pail lines.",
    responsibilities: [
      "Oversee positive-pressure hygienic molding floor monitoring and particulate surveillance.",
      "Conduct batch-level wall thickness, drop-impact, and top-load crush testing.",
      "Manage audit preparation and documentation for enterprise FMCG and beverage clients.",
      "Implement corrective and preventive action (CAPA) frameworks across blow and injection molding operations.",
    ],
    requirements: [
      "B.Sc. in Chemical Engineering, Polymer Science, Applied Chemistry, or Mechanical Engineering.",
      "Minimum 4+ years of hands-on QA/QC leadership in plastic packaging or food-grade container manufacturing.",
      "In-depth working knowledge of ISO 9001:2015, ISO 22000, HACCP, and BSTI standards.",
      "Strong command of statistical quality control software and metrology equipment.",
    ],
    benefits: [
      "Competitive executive remuneration package",
      "Annual performance incentive bonuses & provident fund",
      "Company subsidized transport to Kaliakoir, Gazipur campus",
      "Full family medical coverage and health insurance",
    ],
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "JOB-TECH-02",
    title: "High-Speed Blow Molding Technician",
    department: "Production & Tooling",
    facility: "Kaliakoir Plant, Latifpur-B",
    location: "Latifpur-B, Kaliakoir-1750, Gazipur",
    type: "Full-Time",
    experience: "3 - 5 Years",
    summary:
      "Operate and maintain high-speed stretch & extrusion blow molding lines for 19L pure water jars, PET bottles, and heavy-duty HDPE chemical containers.",
    responsibilities: [
      "Setup, calibrate, and run multi-cavity automated blow molding machinery to exact micron specifications.",
      "Perform rapid tooling changeovers, mold maintenance, and preform temperature profile optimization.",
      "Diagnose hydraulic, pneumatic, and thermal anomalies to maximize overall equipment effectiveness (OEE).",
      "Maintain strict adherence to plant safety protocols and clean-regrind recycling procedures.",
    ],
    requirements: [
      "Diploma or Vocational Certification in Mechanical, Electrical, or Plastics Engineering.",
      "3+ years operating automated blow molding or injection molding machines in high-volume industrial plants.",
      "Familiarity with Nissei ASB, Aoki, or similar international stretch blow molding machinery.",
      "Ability to work in rotational shifts with a safety-first mindset.",
    ],
    benefits: [
      "Attractive monthly compensation with shift allowances",
      "Overtime pay and attendance performance incentives",
      "Subsidized meals at plant cafeteria",
      "Comprehensive technician life & accident insurance",
    ],
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "JOB-TOOL-03",
    title: "CNC Tool & Mold Maintenance Specialist",
    department: "Engineering & Maintenance",
    facility: "Kaliakoir Precision Tool Room",
    location: "Kaliakoir-1750, Gazipur",
    type: "Full-Time",
    experience: "5 - 8 Years",
    summary:
      "Execute high-precision mold manufacturing, CNC milling, wire EDM, and preventive maintenance on multi-cavity injection and blow molds.",
    responsibilities: [
      "Program and operate 3-axis and 5-axis CNC machining centers using Mastercam / SolidWorks.",
      "Perform precision polishing, conformal cooling flushing, and refurbishing of pail and cap molds.",
      "Inspect finished tooling utilizing optical comparators, height gauges, and CMM metrology.",
      "Collaborate with engineering to prototype custom container necks and handle cavities rapidly.",
    ],
    requirements: [
      "Diploma / B.Sc. in Mechanical Engineering or Advanced Tool & Die Making certification.",
      "5+ years of verified mastery in plastic injection & blow mold fabrication.",
      "Proficiency in G-code, CNC programming, and tight-tolerance (±0.005mm) machining.",
      "Demonstrated problem-solving agility in runner balancing and mold cooling troubleshooting.",
    ],
    benefits: [
      "Top-tier technical specialist compensation structure",
      "Annual loyalty bonus and skill certification sponsorship",
      "Modern climate-controlled precision tool room environment",
      "Dedicated transport routes across Dhaka & Gazipur",
    ],
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "JOB-SALES-04",
    title: "B2B Key Account Manager (Water, Paint & FMCG Packaging)",
    department: "Sales & Commercial",
    facility: "Noor Plastic Corporate Office",
    location: "Kaliakoir / Dhaka Commercial Desk",
    type: "Full-Time",
    experience: "4 - 6 Years",
    summary:
      "Drive institutional growth, demand forecasting, and client partnerships for pure water bottles, industrial plastic pails, and food-grade closures.",
    responsibilities: [
      "Cultivate and expand corporate accounts with beverage brands, paint manufacturers, and chemical buyers.",
      "Analyze client container specifications, coordinate trial samples, and structure supply contracts.",
      "Coordinate with factory dispatch teams to ensure 100% on-time dockside delivery.",
      "Track market demand for lightweighted PET jars and sustainable PCR plastic pails.",
    ],
    requirements: [
      "BBA / MBA in Marketing, Supply Chain, or B.Sc. in Engineering with commercial acumen.",
      "4+ years of proven track record in B2B corporate sales in plastics, water, or industrial packaging.",
      "Excellent communication, presentation, and enterprise contract negotiation skills.",
      "Strong corporate network across Dhaka and Gazipur manufacturing zones.",
    ],
    benefits: [
      "Competitive executive salary with quarterly sales incentives",
      "Company vehicle / travel allowance",
      "Executive health coverage and corporate mobile allowance",
      "Direct coordination with proprietor & executive leadership",
    ],
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "JOB-AUTO-05",
    title: "Automation & PLC Electrical Engineer",
    department: "Engineering & Maintenance",
    facility: "Kaliakoir Plant, Latifpur-B",
    location: "Kaliakoir-1750, Gazipur",
    type: "Full-Time",
    experience: "3 - 6 Years",
    summary:
      "Lead automation programming, sensor integration, robotic take-out cells, and servo-drive maintenance across blow and injection molding bays.",
    responsibilities: [
      "Troubleshoot PLC ladder logic and HMI interfaces (Siemens, Mitsubishi, Omron).",
      "Maintain automated leak detectors, vision counters, and pneumatic conveyor diverters.",
      "Perform preventive maintenance on VFD drives, servo pumps, and chilled-water plant chillers.",
      "Optimize plant kWh-per-kg energy efficiency across continuous molding shifts.",
    ],
    requirements: [
      "B.Sc. in Electrical & Electronic Engineering (EEE) or Mechatronics.",
      "3+ years experience with industrial automation, PLC programming, and servo drives in manufacturing.",
      "Hands-on expertise with sensor calibration and industrial electrical safety.",
      "Proactive diagnostic skills for rapid production line troubleshooting.",
    ],
    benefits: [
      "Competitive engineering salary package with milestone bonuses",
      "Exposure to servo-hydraulic and automated polymer systems",
      "Subsidized company transport and meals",
      "Medical insurance and continuous technical training",
    ],
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    id: "JOB-PROC-06",
    title: "Raw Material Procurement & Polymer Supply Executive",
    department: "Supply Chain & Logistics",
    facility: "Kaliakoir Campus & Dhaka Logistics",
    location: "Gazipur / Dhaka",
    type: "Full-Time",
    experience: "2 - 4 Years",
    summary:
      "Manage domestic and imported sourcing of virgin PET, HDPE, PP resins, masterbatches, and liner materials alongside port logistics clearance.",
    responsibilities: [
      "Coordinate with overseas petrochemical suppliers and bonded import clearing agents.",
      "Prepare letters of credit (LC), customs documentation, and resin batch tracking.",
      "Monitor global polymer price indices to lock in reliable inventory buffers.",
      "Coordinate incoming resin COA verification with the QA engineering team.",
    ],
    requirements: [
      "Graduate in Supply Chain Management, Business, Economics, or Engineering.",
      "2-4 years experience in import procurement, LC management, and plastic raw material sourcing.",
      "Proficiency in ERP inventory systems and Bangladesh import regulations.",
      "Strong vendor negotiation and meticulous documentation discipline.",
    ],
    benefits: [
      "Competitive compensation package with annual increments",
      "Provident fund and festive bonuses",
      "Fast-track growth in an expanding plastic manufacturing enterprise",
      "Corporate transport and health insurance",
    ],
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
];

