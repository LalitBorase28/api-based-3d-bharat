import api from "../../../services/api";

/**
 * Industry-standard Service Layer for Department Management.
 * Centralizes all API interactions and data mapping.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Images are served from the root domain, not the /server sub-path
const IMAGE_BASE_URL = new URL(API_BASE_URL).origin;

export const createDepartment = async (values) => {
  try {
    const data = new FormData();
    data.append("dept_full_name", values.fullName);
    data.append("dept_short_name", values.shortName);
    
    if (values.logo) {
      data.append("dept_logo", values.logo);
    }

    data.append(
      "required_modules",
      values.modules.workProgress2 ? 3 : values.modules.workProgress1 ? 2 : 1
    );
    data.append("created_by", 1);
    data.append("created_by_id", 1101);

    data.append("dept_head_name", values.head.name);
    data.append("dept_head_mobile", values.head.mobile);
    data.append("dept_head_email", values.head.email);

    data.append("operational_manager_name", values.manager.name);
    data.append("operational_manager_mobile", values.manager.mobile);
    data.append("operational_manager_email", values.manager.email);

    // Submission still uses the full API URL
    const response = await api.post("/data/create-department", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDepartments = async () => {
  try {
    const data = await api.get("/data/fetch-departments");
    
    const departmentList = Object.keys(data)
      .filter(key => !isNaN(key))
      .map(key => {
        const dept = data[key];
        
        const head = dept.employees?.find(emp => 
          emp.profiles?.some(p => p.pha_id === "102001")
        );
        const manager = dept.employees?.find(emp => 
          emp.profiles?.some(p => p.pha_id === "102002")
        );

        return {
          id: dept.id,
          dept_id: dept.dha_id,
          shortName: dept.dept_short_name,
          fullName: dept.dept_full_name,
          // Robust image resolution: Prepend the root origin (IMAGE_BASE_URL) 
          // but only if it's a relative path and not a full URL already.
          logo: dept.dept_logo 
            ? (dept.dept_logo.startsWith("http") ? dept.dept_logo : `${IMAGE_BASE_URL}${dept.dept_logo}`) 
            : null,
          status: dept.status,
          createdAt: dept.inserted_on ? dept.inserted_on.split('T')[0] : 'N/A',


          head: head ? {
            name: head.emp_full_name,
            email: head.emp_email,
            mobile: head.emp_mob_no
          } : null,
          manager: manager ? {
            name: manager.emp_full_name,
            email: manager.emp_email,
            mobile: manager.emp_mob_no
          } : null,
          modulesCount: dept.required_modules
        };
      });
      
    return departmentList;
  } catch (error) {
    throw error;
  }
};


