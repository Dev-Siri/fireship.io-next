import Image from "next/image";

interface Props {
  title: string;
  description: string;
  tags: string[];
  img: string;
  permalink: string;
}

export default function Card({ title, description, tags, img, permalink }: Props) {
  const imgUrl = img || `/img/${permalink}/featured.webp`;

  return (
    <article className="max-w-sm overflow-hidden shadow-xl bg-gray6 y-6 hover:scale-105 rounded-xl transition-transform ease-in-out duration-500">
      <a href={permalink} className="no-underline">
        <Image className="w-full m-0 mb-1 rounded-t-xl" src={imgUrl} alt={title} width={289} height={162} />
        <section className="p-5">
          <h5>{title}</h5>
          <p className="text-gray3 min-h-[100px]">{description}</p>
          {tags.map(tag => (
            <span key={tag} className={`tag tag-${tag}`}>
              #{tag}
            </span>
          ))}
        </section>
      </a>
    </article>
  );
}
