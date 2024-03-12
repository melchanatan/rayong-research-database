import ResearchHeader from "@/components/ResearchHeader";
import React from "react";

const ResearchPage = () => {
  return (
    <div>
      <li className="flex gap-6">
        <div className="flex flex-col gap-3">
          <ul className="flex flex-col gap-3 overflow-y-auto h-[80vh] pl-3 box-container">
            <ResearchHeader></ResearchHeader>
            <p className="paragraph">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur quo iusto, rerum sit eligendi minima repudiandae
              molestias rem natus illo, quisquam recusandae libero optio saepe.
              Qui saepe aperiam possimus officia. Iure inventore velit, facilis
              et sed qui similique tenetur? Quam alias veritatis magnam, ducimus
              earum, neque nobis unde mollitia nesciunt maxime facere cupiditate
              ratione. Voluptates et provident eum ea itaque? Ab doloremque
              atque optio exercitationem tempora, adipisci aperiam nulla maiores
              quia ex. Earum tenetur consequatur maxime exercitationem labore
              temporibus eius eum, modi, libero dolore inventore molestiae
              quidem adipisci. Eos, labore.
            </p>
          </ul>
          <ul className="glassmorphism">
            <h3>ทรัพยากร</h3>
            <p>hello world</p>
          </ul>
        </div>
        <ul className="glassmorphism py-8 rounded-lg px-6 w-[50%] ">
          <li>
            <h3>องกรณ์</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              voluptates aut numquam rem esse, odit molestias
            </p>
          </li>
          <ul className="flex flex-col gap-2">
            <h3>ชื่อผู้ค้นคว้า</h3>
            <ResearcherDetail />
          </ul>
        </ul>
      </li>
    </div>
  );
};

export default ResearchPage;

const ResearcherDetail = () => {
  return (
    <div>
      <li>สมพร เเสนดี</li>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptates
        aut numquam rem esse, odit molestias
      </p>
    </div>
  );
};
