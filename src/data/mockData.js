import lntLogo from "../assets/cont logo/L&T.png";
import tataLogo from "../assets/cont logo/tata.jpg";
import pwdLogo from "../assets/dept logo/pwd.jpg";
import clientLogo from "../assets/dept logo/clientlogo4.png";

const maleFirstNames = [
  "Arjun", "Karan", "Rahul", "Aditya", "Rohan", "Siddharth", "Vikram", "Abhishek", "Sameer", "Puneet",
  "Lalit", "Amit", "Sanjay", "Deepak", "Yash", "Tushar", "Suraj", "Akash", "Gaurav", "Nitin",
  "Vijay", "Rajesh", "Anil", "Sunil", "Vivek", "Sandeep", "Manoj", "Pankaj", "Rakesh", "Suresh"
];
const lastNames = [
  "Sharma", "Verma", "Gupta", "Malhotra", "Kapoor", "Joshi", "Patel", "Singh", "Yadav", "Kumar",
  "Borase", "Reddy", "Chauhan", "Mehta", "Iyer", "Nair", "Desai", "Shinde", "Pawar", "Kulkarni"
];

// Reference designations as per designation_header_all
export const mockDesignations = {
  General: [
    { dgh_id: "D001", name: "Contractor Head", for: 2 },
    { dgh_id: "D002", name: "Operation Manager", for: 2 },
    { dgh_id: "D010", name: "Operation Head", for: 2 },
  ],
  ProjectManager: [
    { dgh_id: "D003", name: "Senior Engineer", for: 2 },
    { dgh_id: "D004", name: "Site Supervisor", for: 2 },
    { dgh_id: "D005", name: "Project Architect", for: 2 },
    { dgh_id: "D006", name: "Safety Officer", for: 2 },
    { dgh_id: "D007", name: "Quality Analyst", for: 2 },
  ],
  Drone: [
    { dgh_id: "D201", name: "Drone Pilot", for: 2 },
    { dgh_id: "D202", name: "Flight Operator", for: 2 },
    { dgh_id: "D203", name: "GIS Data Analyst", for: 2 },
    { dgh_id: "D204", name: "UAV Technician", for: 2 },
  ],
  Design: [
    { dgh_id: "D301", name: "Chief Architect", for: 2 },
    { dgh_id: "D302", name: "Structural Engineer", for: 2 },
    { dgh_id: "D303", name: "BIM Modeler", for: 2 },
    { dgh_id: "D304", name: "Design Drafter", for: 2 },
  ],
  Measurement: [
    { dgh_id: "D401", name: "Senior Surveyor", for: 2 },
    { dgh_id: "D402", name: "Quality Inspector", for: 2 },
    { dgh_id: "D403", name: "Measurement Clerk", for: 2 },
    { dgh_id: "D404", name: "Chainage Expert", for: 2 },
  ]
};

/**
 * Helper to generate employees aligned with employee_header_all schema
 */
const generateEmployees = (baseName, totalCount, contId, sector = "ProjectManager") => {
  const count = Math.max(totalCount, 3);
  const sectorDesignations = mockDesignations[sector] || mockDesignations.ProjectManager;
  const generalDesignations = mockDesignations.General;

  // Authority names mapped by sector
  const sectorAuthorities = {
    ProjectManager: ["Inspection", "Planning", "Material Checker", "Site Verification"],
    Drone: ["Drone Upload", "Survey", "Aerial Mapping", "Flight Planning"],
    Design: ["Design Review", "Planning", "BIM Coordination", "Drafting"],
    Measurement: ["Measurement", "Material Checker", "Survey", "Chainage Verification"],
  };

  const authPool = sectorAuthorities[sector] || sectorAuthorities.ProjectManager;

  return Array.from({ length: count }, (_, i) => {
    const fName = maleFirstNames[(i + baseName.charCodeAt(0)) % maleFirstNames.length];
    const lName = lastNames[(i + baseName.length) % lastNames.length];
    const fullName = `${fName} ${lName}`;

    // Default roles for leading team
    let dgh;
    if (i === 0) dgh = generalDesignations[0]; // Contractor Head
    if (i === 1) dgh = generalDesignations[1]; // Operation Manager
    if (i === 2) dgh = generalDesignations[2]; // Operation Head

    // Sector specific roles for the rest
    if (i > 2) {
      dgh = sectorDesignations[(i - 3) % sectorDesignations.length];
    }

    // Leadership (Contractor Head & Operation Manager) have all authorities — no specific assignment
    let empAuthorities = [];
    if (i > 1) {
      const empAuthCount = 1 + (i % 3); // 1, 2, or 3 authorities
      for (let a = 0; a < empAuthCount; a++) {
        const auth = authPool[(i + a) % authPool.length];
        if (!empAuthorities.includes(auth)) empAuthorities.push(auth);
      }
    }

    return {
      id: i + 1,
      eha_id: `EMP-${contId}-${String(i + 1).padStart(3, '0')}`,
      employee_of: 2, // Contractor
      emp_of_id: contId,
      dgh_id: dgh.dgh_id,
      designation_name: dgh.name, // For UI convenience
      emp_full_name: fullName,
      emp_mob_no: `+91 98765 000${String(i).padStart(2, '0')}`,
      emp_email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@contractor.com`,
      emp_address: "Sector 5, Industrial Area, Hubli",
      status: i % 5 === 0 ? "Inactive" : "Active",
      inserted_on: "2026-03-21",
      authorities: empAuthorities,
      jurisdiction: { from_km: 120, to_km: 150 }
    };
  });
};

export const departments = [
  {
    id: 1,
    dha_id: "DHA002",
    dept_full_name: "Highway Authority (NHAI)",
    dept_short_name: "NHAI",
    status: 2,
    head_name: "Anish Pawar",
    head_email: "anish@gov.in",
    manager_name: "Suresh Gupta",
    manager_email: "suresh.gupta@gov.in",
    logo: pwdLogo,
    projects: [
      {
        id: 101,
        project_id: "PRJ-NH44",
        project_name: "National Highway 44 (NH44)",
        project_short_name: "NH44",
        project_description: "Strategic corridor development and expansion involving smart monitoring.",
        from_km: 120,
        to_km: 185,
        from_chainage: 0,
        to_chainage: 0,
        status: 2,
        desgin_status: 3,
        deployement_status: 3,
        construction_status: 1,
        project_address: "Lalitpur to Nagpur Section",
        project_created_by: 1,
        project_added_by_id: "DHA002",
        added_by_name: "Anish Pawar",
        inserted_on: "2026-03-21 10:30",
        documents: [
          { id: 1, name: "Project Charter NH44.pdf", type: "PDF" },
          { id: 2, name: "Land Acquisition Status.xlsx", type: "XLS" },
          { id: 3, name: "Environmental Clearance.pdf", type: "PDF" }
        ],
        projectContractors: [
          {
            id: 1,
            cont_id: "C001",
            name: "Sterling & Wilson",
            role: "Project Manager",
            status: "Active",
            authority: ["Inspection", "Planning", "Material Checker"],
            jurisdiction: "KM 120 - 150",
            documents: [
              { id: 101, name: "PMC Report Phase 1.pdf", type: "PDF" },
              { id: 102, name: "Quality Assurance.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Sterling & Wilson", 15, "C001", "ProjectManager")
          },
          {
            id: 5,
            cont_id: "C005",
            name: "Skyline Drone Solutions",
            role: "Drone Contractor",
            status: "Active",
            authority: ["Drone Upload", "Survey"],
            jurisdiction: "KM 150 - 165",
            documents: [
              { id: 501, name: "Drone Flight Log.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Skyline Drone Solutions", 8, "C005", "Drone")
          },
          {
            id: 6,
            cont_id: "C006",
            name: "Vertex Design Studio",
            role: "Design Contractor",
            status: "Active",
            authority: ["Design Review", "Planning"],
            jurisdiction: "KM 165 - 185",
            documents: [
              { id: 601, name: "Structural Design.pdf", type: "PDF" },
              { id: 602, name: "Design Clearance.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Vertex Design Studio", 3, "C006", "Design")
          },
          {
            id: 7,
            cont_id: "C007",
            name: "Precision Measurements",
            role: "Measurement Contractor",
            status: "Under Review",
            authority: ["Measurement", "Material Checker"],
            jurisdiction: "KM 120 - 140",
            documents: [
              { id: 701, name: "Chainage Report.xlsx", type: "XLS" }
            ],
            employees: generateEmployees("Precision Measurements", 3, "C007", "Measurement")
          },
          {
            id: 8,
            cont_id: "C008",
            name: "Pioneer Design Studio",
            role: "Design Contractor",
            status: "Active",
            authority: ["Design Review", "Inspection"],
            jurisdiction: "KM 140 - 185",
            documents: [
              { id: 801, name: "Draft Masterplan.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Pioneer Design Studio", 3, "C008", "Design")
          },
          {
            id: 9,
            cont_id: "C009",
            name: "Metric Surveyors Ltd",
            role: "Measurement Contractor",
            status: "Active",
            authority: ["Measurement", "Survey"],
            jurisdiction: "KM 130 - 160",
            documents: [
              { id: 901, name: "Site Survey Data.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Metric Surveyors Ltd", 4, "C009", "Measurement")
          }
        ]
      },
      {
        id: 102,
        project_id: "PRJ-EXP1",
        project_name: "Expressway 1 (EXP1)",
        project_short_name: "EXP1",
        project_description: "Greenfield expressway construction phase 1 with smart tollying.",
        from_km: 50,
        to_km: 120,
        from_chainage: 0,
        to_chainage: 0,
        status: 2,
        desgin_status: 2,
        deployement_status: 3,
        construction_status: 1,
        project_address: "Mumbai - Pune Access Controlled",
        project_created_by: 1,
        project_added_by_id: "DHA002",
        added_by_name: "Anish Pawar",
        inserted_on: "2026-03-20 14:15",
        documents: [
          { id: 4, name: "EXP1 Master Plan.pdf", type: "PDF" },
          { id: 5, name: "Feasibility Study.pdf", type: "PDF" }
        ],
        projectContractors: [
          {
            id: 2,
            cont_id: "C002",
            name: "Techno PMC",
            role: "Project Manager",
            status: "Active",
            authority: ["Inspection", "Planning"],
            jurisdiction: "KM 50 - 120",
            documents: [
              { id: 201, name: "Expressway Design.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Techno PMC", 12, "C002", "ProjectManager")
          },
          {
            id: 11,
            cont_id: "C011",
            name: "Zenith Design",
            role: "Design Contractor",
            status: "Active",
            authority: ["Design Review", "Planning"],
            jurisdiction: "KM 50 - 85",
            documents: [
              { id: 1101, name: "Road Sections.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Zenith Design", 3, "C011", "Design")
          },
          {
            id: 12,
            cont_id: "C012",
            name: "Ace Drone Surveys",
            role: "Drone Contractor",
            status: "Active",
            authority: ["Drone Upload", "Survey"],
            jurisdiction: "KM 85 - 120",
            documents: [
              { id: 1201, name: "Survey Log.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Ace Drone Surveys", 8, "C012", "Drone")
          },
          {
            id: 13,
            cont_id: "C013",
            name: "Focus Measurements",
            role: "Measurement Contractor",
            status: "Active",
            authority: ["Measurement", "Material Checker"],
            jurisdiction: "KM 50 - 65",
            documents: [
              { id: 1301, name: "Inventory Sheet.xlsx", type: "XLS" }
            ],
            employees: generateEmployees("Focus Measurements", 4, "C013", "Measurement")
          }
        ]
      }
    ]
  },
  {
    id: 3,
    dha_id: "DHA003",
    dept_full_name: "PWD Dept",
    dept_short_name: "PWD",
    status: 2,
    head_name: "Ayush Saxena",
    head_email: "ayush@gov.in",
    manager_name: "Vikram Singh",
    manager_email: "vikram@gov.in",
    logo: clientLogo,
    projects: [
      {
        id: 103,
        project_id: "PRJ-SH8",
        project_name: "State Highway 8",
        project_short_name: "SH8",
        project_description: "State highway road widening and resurfacing",
        from_km: 10,
        to_km: 45,
        from_chainage: 0,
        to_chainage: 0,
        status: 2,
        desgin_status: 3,
        deployement_status: 3,
        construction_status: 1,
        project_address: "Nashik Region PWD Section",
        project_created_by: 1,
        project_added_by_id: "DHA003",
        added_by_name: "Ayush Saxena",
        inserted_on: "2026-03-15 09:00",
        documents: [
          { id: 6, name: "SH8 Road Study.pdf", type: "PDF" }
        ],
        projectContractors: [
          {
            id: 10,
            cont_id: "C010",
            name: "Global Design Corp",
            role: "Design Contractor",
            status: "Active",
            authority: ["Design Review", "Planning", "Inspection"],
            jurisdiction: "KM 10 - 45",
            documents: [
              { id: 1001, name: "SH8 Phase 1 Design.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Global Design Corp", 3, "C010", "Design")
          },
          {
            id: 14,
            cont_id: "C014",
            name: "Aero Viz Drone",
            role: "Drone Contractor",
            status: "Active",
            authority: ["Drone Upload", "Survey"],
            jurisdiction: "KM 10 - 25",
            documents: [
              { id: 1401, name: "Flight Report.pdf", type: "PDF" }
            ],
            employees: generateEmployees("Aero Viz Drone", 8, "C014", "Drone")
          },
          {
            id: 15,
            cont_id: "C015",
            name: "Rapid Measurements",
            role: "Measurement Contractor",
            status: "Active",
            authority: ["Measurement", "Material Checker"],
            jurisdiction: "KM 25 - 45",
            documents: [
              { id: 1501, name: "KMC Chart.xlsx", type: "XLS" }
            ],
            employees: generateEmployees("Rapid Measurements", 3, "C015", "Measurement")
          }
        ]
      }
    ]
  }
];

export const contractors = [
  {
    id: 1,
    cont_id: "C001",
    cont_name: "Sterling & Wilson",
    cont_short_name: "S&W",
    status: 2,
    head_name: "Rajesh Kumar",
    head_email: "rk@sw.com",
    manager_name: "Amit Patel",
    manager_email: "amit.patel@sw.com",
    logo: lntLogo,
    projects: [
      {
        id: 201,
        project_id: "PRJ-CRP",
        project_name: "Coastal Road Project",
        project_short_name: "CRP-L&T",
        project_description: "8-lane coastal road project reclamation",
        from_km: 5,
        to_km: 15,
        from_chainage: 0,
        to_chainage: 0,
        status: 2,
        desgin_status: 3,
        deployement_status: 3,
        construction_status: 2,
        project_address: "Worli to Marine Drive Phase 1",
        project_created_by: 2,
        project_added_by_id: "C001",
        added_by_name: "Rajesh Kumar",
        inserted_on: "2026-03-21 11:20",
        documents: [],
        projectContractors: []
      }
    ]
  },
  {
    id: 2,
    cont_id: "C002",
    cont_name: "Vertex Design Studio",
    cont_short_name: "VERTEX",
    status: 2,
    head_name: "Sanjay Singh",
    head_email: "sanjay@vertex.com",
    manager_name: "Deepak Verma",
    manager_email: "deepak.verma@vertex.com",
    logo: tataLogo,
    projects: [
      {
        id: 202,
        project_id: "PRJ-METB",
        project_name: "Metro Corridor B",
        project_short_name: "MET-B",
        project_description: "Elevated metro line corridor construction",
        from_km: 0,
        to_km: 12,
        from_chainage: 0,
        to_chainage: 0,
        status: 2,
        desgin_status: 2,
        deployement_status: 3,
        construction_status: 1,
        project_address: "North-East Metro Link Line 4",
        project_created_by: 2,
        project_added_by_id: "C002",
        added_by_name: "Sanjay Singh",
        inserted_on: "2026-03-18 16:45",
        documents: [],
        projectContractors: []
      }
    ]
  }
];

// Flat export for backward compatibility
export const projects = [
  ...departments.flatMap(d => d.projects.map(p => ({
    ...p,
    name: p.project_name,
    designStatus: p.desgin_status,
    deploymentStatus: p.deployement_status,
    constructionStatus: p.construction_status,
    departmentId: d.id,
    addedBy: p.added_by_name
  }))),
  ...contractors.flatMap(c => c.projects.map(p => ({
    ...p,
    name: p.project_name,
    designStatus: p.desgin_status,
    deploymentStatus: p.deployement_status,
    constructionStatus: p.construction_status,
    contractorId: c.id,
    addedBy: p.added_by_name
  })))
];
