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

  const addTab = (tab) => {
    if (tabs.find((t) => t.name === tab.name)) {
      return;
    }
    setTabs([...tabs, tab]);
  };
  return (
    <TabContext.Provider value={{ tabs, setTabs, addTab }}>
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabContextProvider };
