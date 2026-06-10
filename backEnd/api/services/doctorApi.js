// api/services/doctorApi.js
import mainClient from "../clients/mainClient";

/**
 * Registers a new doctor using multi-part form data
 * @param {FormData} data - Built multi-part form body containing text fields and picked media files
 */
export const doctorSignup = (data) => {
  return mainClient.post("/auth/register/doctor", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};