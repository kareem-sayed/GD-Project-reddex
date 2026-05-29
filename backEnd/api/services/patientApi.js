import mainClient  from "../clients/mainClient";

export const getMyPrescriptions =
  async () => {

    const res = await mainClient.get(
      "/prescriptions/me/medications"
    );

    return  res.data.data;
};
export const getPatientProfile =
  async () => {

    const res = await mainClient.get(
      "/users/me"
    );

    return res.data.data;
};