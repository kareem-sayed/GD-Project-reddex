import React, { createContext, useState } from "react";

export const PatientContext = createContext();

export default function PatientProvider({ children }) {
const [profile, setProfile] = useState(null);
const [medications, setMedications] = useState([]);

// 👈 ضفنا الـ State الخاصة بنتائج التحاليل هنا
const [results, setResults] = useState([]);

return (
<PatientContext.Provider
    value={{
    profile,
    setProfile,
    medications,
    setMedications,
    results,
    setResults,
    }}
>
    {children}
</PatientContext.Provider>
);
}