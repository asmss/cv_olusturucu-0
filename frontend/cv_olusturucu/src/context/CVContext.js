import React,{createContext,useState} from "react";

export const CVContext = createContext();

export const CVProvider = ({children}) => {
     const [cvData,setCvData] = useState({
        personal: {
        name:"",
        title:"",
        email:"",
        phone:"",
        github:"",
        linkedin:"",
        location:"",
        about:""
        },
        skills: [],
        experience: [],
        education:[],
        projects: [],
        languages: []
     });
  const updatePersonal = (key, value) => {
    setCvData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [key]: value,
      },
    }));
  };
   const addSkill=() => {
      setCvData(prev =>({
         ...prev,
         skills:[
            ...prev.skills,
            {skillName:"",level:""}
         ]
      }))
   };

   const updateSkill = (index,key,value) =>{
      setCvData(prev =>{
         const updated = [...prev.skills];
         updated[index][key] = value;
         return {...prev,skills:updated};
      })
   }
     const removeSkill = index => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };


   const addExperience=() => {
      setCvData(prev =>({
         ...prev,
         experience:[
            ...prev.experience,
            {company:"",position:"",startDate:"",endDate:"",description:""}
         ]
      }))
   };

   const updateExperience = (index,key,value) =>{
      setCvData(prev =>{
         const updated = [...prev.experience];
         updated[index][key] = value;
         return {...prev,experience:updated};
      })
   }
     const removeExperience = index => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
  setCvData(prev => ({
    ...prev,
    education: [
      ...prev.education,
      {
        school: "",
        department: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  }));
};

   const updateEducation = (index, field, value) => {
     const updated = [...cvData.education];
      updated[index] = {
      ...updated[index],
     [field]: value,
  };

   setCvData(prev => ({
       ...prev,
      education: updated,
     }));
   };

   const removeEducation = index => {
     const filtered = cvData.education.filter((_, i) => i !== index);

     setCvData(prev => ({
       ...prev,
       education: filtered,
     }));
   };
const addProject = () => {
  setCvData(prev => ({
    ...prev,
    projects: [
      ...prev.projects,
      {
        name: "",
        tech: "",
        description: "",
      },
    ],
  }));
};

const updateProject = (index, field, value) => {
  const updated = [...cvData.projects];
  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  setCvData(prev => ({
    ...prev,
    projects: updated,
  }));
};

const removeProject = index => {
  const filtered = cvData.projects.filter((_, i) => i !== index);

  setCvData(prev => ({
    ...prev,
    projects: filtered,
  }));
};

const addLanguage = () => {
  setCvData(prev => ({
    ...prev,
    languages: [
      ...prev.languages,
      {
        name: "",
        level: "",
      },
    ],
  }));
};

const updateLanguage = (index, field, value) => {
  const updated = [...cvData.languages];
  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  setCvData(prev => ({
    ...prev,
    languages: updated,
  }));
};

const removeLanguage = index => {
  const filtered = cvData.languages.filter((_, i) => i !== index);

  setCvData(prev => ({
    ...prev,
    languages: filtered,
  }));
};

   
     return(
        <CVContext.Provider value = {{cvData,
        setCvData,
        updatePersonal,
        addSkill,
        updateSkill,
        removeSkill,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
      addLanguage,
        updateLanguage,
        removeLanguage,
        }}>
          {children}
        </CVContext.Provider>
     )
    


}