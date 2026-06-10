import mainClient  from "../clients/mainClient";

export const getMyPrescriptions = async () => {
  const res = await mainClient.get(`/prescriptions/me/medications`);
  return res.data.data;
};

export const getPatientProfile =
  async () => {
    const res = await mainClient.get(
      "/users/me"
    );

    return res.data.data;
};

export const updateUserProfile = async (id, updatedData) => {
  const res = await mainClient.patch(`/users/${id}`, updatedData);
  
    return res.data.data; 
};



export const getLabs = async () => {
    
    const res = await mainClient.get("/labs");

    return res.data.data;
};

export const getDoctors = async (searchQuery = "") => {
    
    const res = await mainClient.get("/follow-up/patient/doctors-status", {
        params: {
            search: searchQuery  
        }
    });

    return res.data.data;
};

export const followDoctor = async (doctorId) => {
    const res=await mainClient.post("/follow-up", {
        doctorId: doctorId
    });
    return res.data.data;
}


export const getPatientDoctors =
  async () => {

    const res = await mainClient.get(
      "/follow-up/patient/doctors"
    );

    return res.data.data;
};
export const getResults = async () => {

  const res = await mainClient.get(`/results`);
  return res.data.data; // أو res.data حسب شكل الريسبونس بتاعك
};