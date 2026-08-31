import React from "react";
import { Link } from "react-router-dom";
import useSidebar from "@/hooks/useSidebar";

import MoraIcon from "@/assets/images/logo/mora-icon.png";

const SidebarLogo = ({ menuHover }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();

  return (
    <div
      className={`logo-segment flex justify-between items-center bg-white dark:bg-gray-800 z-[9] py-5 px-4
      ${menuHover ? "logo-hovered" : ""}
      `}
    >
      <Link to="/dashboard">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          
          {/* MORA ICON */}
          <div className="logo-icon w-[48px] h-[48px] flex-shrink-0">
            <img
              src={MoraIcon}
              alt="MORA"
              className="w-full h-full object-contain"
            />
          </div>

          {/* MORA BRAND */}
          {(!collapsed || menuHover) && (
            <div className="leading-tight">
              <h1 className="text-[22px] font-semibold tracking-tight text-gray-900 dark:text-white">
                MORA
              </h1>

              <p className="mt-[2px] text-[8px] font-medium tracking-[0.08em] text-gray-400 dark:text-gray-400 uppercase whitespace-nowrap">
                Madrasah Learning Platform
              </p>
            </div>
          )}
        </div>
      </Link>

      {/* Collapse Button */}
      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1px] border-gray-900 dark:border-gray-700 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-1 ring-inset ring-offset-[4px] ring-gray-900 dark:ring-gray-400 bg-gray-900 dark:bg-gray-400 dark:ring-offset-gray-700"
          }
          `}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;