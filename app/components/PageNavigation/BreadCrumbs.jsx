import React from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
export default function BreadCrumbs(props) {
  const { navi } = props;

  return (
    <Breadcrumb aria-label="Navigation" className="bg-white p-2 rounded-md">
      <Breadcrumb.Item href="/" icon={HiHome}>
        Home
      </Breadcrumb.Item>

      <Breadcrumb.Item>{navi}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
