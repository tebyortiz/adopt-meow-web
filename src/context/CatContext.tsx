import { createContext, useContext, useState, ReactNode } from "react";
import { CatData } from "../models/CatData";
import { createCatRequest } from "../services/auth";

interface CatContextProps {
  cats: CatData[];
  createCat: (cat: CatData) => Promise<void>;
}

const CatContext = createContext<CatContextProps | undefined>(undefined);

export const CatProvider = ({ children }: { children: ReactNode }) => {
  const [cats, _setCats] = useState<CatData[]>([]);

  const createCat = async (cat: CatData) => {
    try {
      await createCatRequest(cat);
      //getCats();
    } catch (error) {
      //console.error("Failed to create cat", error);
    }
  };

  return (
    <CatContext.Provider
      value={{
        cats,
        createCat,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCats = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCats must be used within a CatProvider");
  }
  return context;
};
