import BookList from "@/components/BookList";
import { useBookSearch } from "../../store/useBookSearch";
import EmptyList from "./EmptyList";

function BookListWrapper() {
  const bookList = useBookSearch((state) => state.bookList);

  if (bookList.length === 0) {
    return <EmptyList />;
  }

  return (
    <section>
      <BookList bookList={bookList} />
    </section>
  );
}

export default BookListWrapper;
