const ResearchListView = ({ research, tagName, id }) => {
  const router = useRouter();
  const { setTabs } = useContext(TabContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newTab: Tab = {
      name: "topic 1",
      href: "topic",
    };

    setTabs((prev) => [...prev, newTab]);
    router.push("/research/" + id);
  };
  return (
    <a
      dir="ltr"
      className="box-container flex flex-col gap-3 hover:shadow-lg cursor-pointer"
      href="/research/topic"
      onClick={handleClick}
    >
      <ResearchHeader title={research.DocName} tagName={tagName} />
      <p className="text-gray-600">กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช</p>
    </a>
  );
};

const LoadingSkeleton = () => {
  return (
    <div dir="ltr" className="box-container flex flex-col gap-6">
      <div className="flex flex-col gap-1 ">
        <h1 className="loading w-full h-[36px]"></h1>
        <p className="loading w-[30%] h-[18px]"></p>
      </div>
      <p className="loading w-[80%] h-[18px]"></p>
    </div>
  );
};

ResearchListView.loading = LoadingSkeleton;

export default ResearchListView;
