import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import DropdownItem from './DropdownItem';

const DropdownObj = ({ label, icon, dropdownItems }) => {
  return (
    <li className="dropdown">
      <a
        href="#"
        className="nav-link dropdown-toggle"
        id="dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className={`fas ${icon}`} />
        <span className="ms-1 d-none d-sm-inline">{label}</span>
      </a>
      <ul
        className="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdown"
      >
        {dropdownItems.map((item, index) => (
          <DropdownItem key={index} label={item.label} link={item.link} />
        ))}
      </ul>
    </li>
  );
};

export default DropdownObj;
