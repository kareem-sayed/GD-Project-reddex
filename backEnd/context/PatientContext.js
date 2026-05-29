import React, {
    createContext,
    useState,
} from "react";

export const PatientContext =
    createContext();

export default function PatientProvider({
    children,
}) {

    const [profile, setProfile] =
    useState(null);

    const [medications, setMedications] =
    useState([]);

    return (

    <PatientContext.Provider
        value={{
        profile,
        setProfile,

        medications,
        setMedications,
        }}
    >

        {children}

    </PatientContext.Provider>
    );
}