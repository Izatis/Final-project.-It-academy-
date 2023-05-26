import React from "react";

import Hero from "@/components/Hero/Hero";
import Statistics from "@/components/Statistics/Statistics";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import RecommendedSiders from "@/components/RecommendedSiders/RecommendedSiders";

const Main = () => {
  return (
    <>
      <Hero />
      <Statistics />
      <CategoriesList />
      <RecommendedSiders />
    </>
  );
};

export default Main;
