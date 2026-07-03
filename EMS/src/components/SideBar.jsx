import React, { useEffect, useState } from "react";
import { dummyProfileData } from "./../assets/assets";

import { Link, useLocation } from "react-router-dom";
import {
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

const SideBar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, [pathname]);

  //   close mobile menu on route change
  useEffect(() => {
    console.log(pathname);
  });
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  async function handleLogout(e) {
    window.location.href = "/login";
  }

  const role = "ADMIN" || "EMPLOYEE";

  const navItemList = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendence", href: "/attendence", icon: CalendarIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "PaySlip", href: "/payslip", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const sidebarContent = (
    <>
      {/* BRAND HEADER */}
      <div className="p-5 pt-6 border-b border-white/15">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <UserIcon className="text-white size-7" />
            <div className="flex flex-col ">
              <h2 className="text-[13px] font-semibold text-white">
                Employee MS
              </h2>
              <p className="text-[11px] font-medium text-slate-500">
                Management System
              </p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>
      {/* USER PROFILE CARD */}

      {userName && (
        <div className="border-slate-500 rounded-md p-3 m-3 bg-slate-800 ">
          <div className="flex  gap-3 items-center">
            <span className="flex rounded-lg justify-center items-center h-9 w-9 bg-slate-700 font-semibold text-white/60 border border-white/50">
              {userName.charAt(0).toUpperCase()}
            </span>
            <div className="flex flex-col ">
              <p className="text-md text-white font-semibold ">{userName}</p>
              <p className="text-sm text-slate-400">
                {role === "ADMIN" ? "Administrator" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* SECTION LABEL */}

      <div className="px-3 pt-5 pb-2">
        <p className="font-semibold tracking-[0.12rem] text-[11px] text-slate-400 uppercase">
          Navigation
        </p>
      </div>

      {/* NAVIGATION LIST */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItemList.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors  ${
                isActive
                  ? "bg-indigo-600/20 text-white shadow-inner"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* LOGOUT BUTTON */}
      <div
        onClick={handleLogout}
        className=" w-full h-full max-h-14  border-t border-white/15  group"
      >
        <div className="w-full group-hover:bg-slate-900 transition-colors duration-200">
          <button
            // onClick={handleLogout}
            className="flex items-center px-3 py-4  ml-3 space-x-2  "
          >
            <LogOutIcon className="h-4.25 w-4.25  group-hover:text-red-400 transition-colors duration-200" />
            <span className="text-white text-[14px] font-semibold group-hover:text-red-400 transition-colors duration-200">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button Icon */}

      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border-white/10"
      >
        <MenuIcon size={20} />
      </button>

      {/* mobile overlay */}

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* sidebar desktop */}

      <aside className="hidden lg:flex flex-col  h-full w-64 bg-linear-to-b from-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4">
        {sidebarContent}
      </aside>
    </>
  );
};

export default SideBar;
