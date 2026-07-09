import { type ComponentProps } from "react";
import BookItem from "./BookItem";

type Props = {
  bookList: ComponentProps<typeof BookItem>[];
};

function BookList({ bookList }: Props) {
  return (
    <ul>
      {bookList.map((book) => (
        <li key={book.isbn}>
          <BookItem {...book} />
        </li>
      ))}
    </ul>
  );
}

export default BookList;
