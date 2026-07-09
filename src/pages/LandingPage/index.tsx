import { useEffect } from "react";
import BookListWrapper from "./components/BookListWrapper";
import ListCount from "./components/ListCount";
import SearchTab from "./components/SearchTab";
import { useBookSearch } from "./store/useBookSearch";

function LandingPage() {
  const reset = useBookSearch((state) => state.actions.reset);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <>
      <SearchTab />
      <ListCount />
      <BookListWrapper />
    </>
  );
}

export default LandingPage;
