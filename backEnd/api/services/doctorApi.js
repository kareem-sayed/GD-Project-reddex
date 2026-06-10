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
export const getPatientPrescriptions = (patientId) => {
  return mainClient.get(`/prescriptions/patient/${patientId}`);
};

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
  return mainClient.patch(`/doctors/${doctorId}`, data);
};