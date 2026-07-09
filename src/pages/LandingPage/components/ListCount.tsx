import Typography from "@/components/Typography";
import { useBookSearch } from "../store/useBookSearch";

function ListCount() {
  const bookList = useBookSearch((state) => state.bookList);
  const bookCount = bookList.length;

  return (
    <section className="ice mb-9 flex gap-4">
      <Typography type="Caption">도서 검색 결과</Typography>
      <Typography type="Caption">
        총 <em className="text-palette-primary">{bookCount}</em>건
      </Typography>
    </section>
  );
}

export default ListCount;
