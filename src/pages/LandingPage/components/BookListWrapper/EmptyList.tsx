import Typography from "@/components/Typography";

function EmptyList() {
  return (
    <section className="mx-auto mt-30">
      <img
        src="/images/book-list-empty.png"
        alt="책"
        width={80}
        height={80}
        fetchPriority="high"
        loading="eager"
        className="mx-auto mb-6"
      />
      <Typography type="Caption" className="text-text-secondary text-center">
        검색된 결과가 없습니다.
      </Typography>
    </section>
  );
}

export default EmptyList;
