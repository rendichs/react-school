import React from "react";
import Icon from "@/components/ui/Icon";

const MenuItem = ({
  activeSubmenu,
  i,
  item,
  toggleSubmenu,
}) => {
  const isOpen = activeSubmenu === i;

  return (
    <div
      className={`menu-link  border-l-2
  border-transparent
  transition-all
  duration-150
  hover:border-green-500
  hover:text-green-600 ${
        isOpen
          ? "parent_active not-collapsed"
          : "collapsed hover:bg-slate-100"
      }`}
      onClick={() => toggleSubmenu(i)}
    >
      {/* Icon + nama menu */}
      <div className="flex-1 flex items-start">
        <span className="menu-icon">
          <Icon icon="ph:users-three" />
        </span>

        <div className="text-box">
          {item.title}
        </div>
      </div>

      {/* Icon buku sebagai toggle */}
      <span className="menu-icon">
        <Icon
          icon={
            isOpen
              ? "ph:book-open"
              : "ph:book"
          }
          width="16"
          height="16"
        />
      </span>
    </div>
  );
};

export default MenuItem;