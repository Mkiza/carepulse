"use client";

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { Patient } from "@/types/appwrite.types";



const Appointment = ({ params: { userId } }: SearchParamProps) => {
  
const [patient, setPatient] = useState<Patient | null>(null);

useEffect(() => {
    const fetchPatient = async () => {
        try {
            const patientData = await getPatient(userId);
            setPatient(patientData);
        } catch (error) {
            console.error("Failed to fetch patient data:", error);
        }
    };

    fetchPatient();
}, [userId]); // If userId is dynamic and can change, it should be a dependency

    
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id || ''}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        loading="lazy"
      />
    </div>
  );
};

export default Appointment;