import Typography from "@/components/Typography";
import SearchBox from "./SearchBox";
import DetailSearch from "./DetailSearch";

function SearchTab() {
  return (
    <section className="mb-6">
      <Typography type="Title-2" className="mb-4 text-[#1A1E27]">
        도서 검색
      </Typography>
      <div className="grid grid-cols-[minmax(0,480px)_min-content] gap-4">
        <SearchBox />
        <DetailSearch />
      </div>
    </section>
  );
}

export default SearchTab;
