import React from "react";
import { useRouter } from "next/router";

const appointment = ({ post }) => {
  const router = useRouter();

  return (
    <div className="container m-auto px-10 mb-4">
      <div className="grid grid-cols-1 gap-12 bg-white rounded-3xl">
        <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ14wKaAeGNiSw6L2lLj0ufYgupGouuv26HMSgHOsEhLrw0xfo1BwLqtRDfEi0BzwAJC1f3lDYZU?gv=true" width="100%" height="800" frameborder="0"></iframe>
      </div>
    </div>
  );
};

export default appointment;
