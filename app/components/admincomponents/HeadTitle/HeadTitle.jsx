import React from "react";
const HeadTitle = (prop) => {
  return (
    <>
      <section className="min-h-[30px] bg-gray-200 flex justify-center items-center p-4 text-Dark text-[20px] tracking-wider uppercase">
        {prop.title}
      </section>
    </>
  );
};

export default HeadTitle;
