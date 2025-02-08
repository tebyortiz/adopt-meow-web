import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CatData } from "../models/CatData";
import {
  createCatRequest,
  getCatsRequest,
  applyAdoptionRequest,
} from "../services/auth";

interface CatContextProps {
  cats: CatData[];
  createCat: (cat: CatData) => Promise<void>;
  getCats: () => void;
  applyAdoption: (catId: string, adopterId: string) => Promise<void>;
}

const CatContext = createContext<CatContextProps | undefined>(undefined);

export const CatProvider = ({ children }: { children: ReactNode }) => {
  const [cats, setCats] = useState<CatData[]>([]);

  const createCat = async (cat: CatData) => {
    try {
      await createCatRequest(cat);
      //getCats();
    } catch (error) {
      //console.error("Failed to create cat", error);
    }
  };

  const getCats = async () => {
    try {
      const response = await getCatsRequest();
      setCats(response.data);
    } catch (error) {
      //console.error("Failed to fetch cats", error);
    }
  };

  const applyAdoption = async (catId: string, adopterId: string) => {
    try {
      await applyAdoptionRequest(catId, adopterId);
      // getCats();
    } catch (error) {
      //console.error("Failed to apply adoption:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <CatContext.Provider
      value={{
        cats,
        createCat,
        getCats,
        applyAdoption,
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
