// api/services/doctorApi.js

import mainClient from "../clients/mainClient";

/**
 * Registers a new doctor using multi-part form data
 */
export const doctorSignup = (data) => {
  return mainClient.post("/auth/register/doctor", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * تسجيل دخول الطبيب
 * POST /auth/login
 */
export const loginDoctor = (email, password) => {
  return mainClient.post("/auth/login", { email, password });
};

/**
 * Fetch current doctor's profile data
 * GET /users/me
 */
export const getDoctorProfile = () => {
  return mainClient.get("/users/me");
};

/**
 * Fetch pending follow-up requests for the doctor
 * GET /follow-up/doctor
 */
export const getPendingFollowUps = () => {
  return mainClient.get("/follow-up/doctor");
};

/**
 * Accept a follow-up request for a specific patient
 * PATCH /follow-up/{id}/respond
 */
export const acceptFollowUpRequest = (id) => {
  return mainClient.patch(`/follow-up/${id}/respond`, {
    status: "ACCEPTED",
  });
};

/**
 * Get all patients followed by the current doctor
 * GET /follow-up/doctor/patients
 */
export const getDoctorPatients = () => {
  return mainClient.get("/follow-up/doctor/patients");
};

/**
 * Get prescriptions for a specific patient
 * GET /prescriptions/patient/{patientId}
 */
// export const getPatientPrescriptions = (patientId) => {
//   return mainClient.get(`/prescriptions/patient/${patientId}`);
// };

/**
 * Update doctor's user profile
 * PATCH /users/{userId}
 */
export const updateDoctorProfile = (userId, data) => {
  return mainClient.patch(`/users/${userId}`, data);
};

/**
 * تحديث بيانات الدكتور والعيادة مباشرة
 * PATCH /doctors/{id}
 */
export const updateOnlyDoctorData = (doctorId, data) => {
  return mainClient.patch(`/doctors/${doctorId}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Fetch patients currently followed up by the logged-in doctor
 * GET /follow-up/doctor/patients
 */
export const getFollowUpPatients = () => {
  return mainClient.get("/follow-up/doctor/patients");
};

/**
 * Fetch the latest AI analysis result for a specific patient
 * GET /results/patient/{userId}
 */
export const getPatientAIResults = (userId) => {
  return mainClient.get(`/results/patient/${userId}`);
};

/**
 * Get prescriptions for a specific patient
 * GET /prescriptions/patient/{patientId}
 */
export const getPatientPrescriptions = (patientId) => {
  return mainClient.get(`/prescriptions/patient/${patientId}`);
};
/**
 * Add a new prescription for a specific patient
 * POST /prescriptions
 */

export const addPrescription = (data) => {
  return mainClient.post("/prescriptions", data);
};
/**
 * Delete a prescription by ID
 * DELETE /prescriptions/{id}
 */
export const deletePrescription = (id) => {
  return mainClient.delete(`/prescriptions/${id}`);
};
/**
 * Update a prescription by ID
 * PUT /prescriptions/{id}
 */
export const updatePrescription = (id, data) => {
  return mainClient.put(`/prescriptions/${id}`, data);
};
