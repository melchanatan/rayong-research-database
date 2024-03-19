import { createContext, useState } from "react";

const TabContext = createContext([]);

const defaultTabs: Tab[] = [
  {
    name: "Home",
    href: "/",
  },
];
const TabContextProvider = ({ children }: { children: JSX.Element }) => {
  const [tabs, setTabs] = useState(defaultTabs);
  return (
    <TabContext.Provider value={{ tabs, setTabs }}>
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabContextProvider };
