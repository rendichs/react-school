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
      className={`menu-link ${
        isOpen
          ? "parent_active not-collapsed"
          : "collapsed"
      }`}
      onClick={() => toggleSubmenu(i)}
    >
      <div className="flex-1 flex items-start">
        <span className="menu-icon">
          <Icon
            icon={
              isOpen
                ? "ph:book-open"
                : "ph:book"
            }
          />
        </span>

        <div className="text-box">
          {item.title}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;