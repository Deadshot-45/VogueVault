// AdminLayout.js
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <section className="w-full min-h-[100dvh] bg-white flex flex-col items-center mx-auto">
      {children}
    </section>
  );
};

export default AdminLayout;