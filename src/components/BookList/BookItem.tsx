import BasicIcon from "../BasicIcon";
import Typography from "../Typography";

type Props = {
  isbn: string;
  title: string;
  contents: string;
  url: string;
  authors: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
};

function BookItem({ title, url, authors, price, sale_price, thumbnail }: Props) {
  return (
    <div className="grid grid-cols-[1fr_min-content] items-center gap-14 border-b border-[#D2D6DA] py-4 pr-4 pl-12">
      <div className="flex items-center">
        <img src={thumbnail} alt={title} width={48} height={68} className="mr-12 aspect-48/68 object-cover" />
        <Typography type="Title-3" className="mr-4 max-w-[30%]">
          {title}
        </Typography>
        <Typography type="Body-2" className="text-text-secondary">
          {authors[0]}
        </Typography>
        <Typography type="Title-3" className="ml-auto">
          {(sale_price || price).toLocaleString()}원
        </Typography>
      </div>
      <div>
        <div className="grid h-12 grid-cols-[repeat(2,115px)] gap-2">
          <a href={url} target="_blank" className="bg-palette-primary flex items-center justify-center rounded-lg">
            <Typography type="Caption" className="text-palette-white">
              구매하기
            </Typography>
          </a>
          <button className="bg-palette-lightGray flex items-center justify-center rounded-lg">
            <Typography type="Caption" className="text-text-secondary">
              상세보기
            </Typography>
            <BasicIcon iconType={{ type: "line", name: "chevronDown" }} className="text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
