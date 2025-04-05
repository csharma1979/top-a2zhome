"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import Image from "next/image";
import "../../../../styles/Sidebar.css";

const Sidebar = ({sidebarShow}) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear the token
    router.push("/cms-login");
  };
  
  return (
    <div className={`sidebar-container ${sidebarShow ? "open" : "closed"}`}>
      <Link href="/" className="nav-item border-bottom p-0">
        <Image
          src="/assets/white-logo.png"
          alt="img"
          className="mx-auto "
          width={150}
          height={65}
          
        />
      </Link>
      <Link href="" className="nav-item"
       //activeClassName="active"
      >
        <span className="icon-wrapper"></span>
        Dashboard
      </Link>
      <Link
        href="/admin/dashboard/blogSetting"
        className="nav-item"
        //activeClassName="active"
      >
        <span className="icon-wrapper"></span>
        Content management
      </Link>
      <Link
        href="/admin/dashboard/service-request"
        className="nav-item"
        //activeClassName="active"
      >
        <span className="icon-wrapper"></span>
        Enquiry
      </Link>

      <div className="nav-item cursor-pointer" onClick={handleLogout}>
        <span className="icon-wrapper"></span>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
