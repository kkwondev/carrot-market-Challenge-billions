import { NextPage } from "next";
import Link from "next/link";
import { billion } from "../pages";
import Image from "next/image";

const Item = ({ id, name, squareImage, netWorth, industries }: billion) => {
  const roundNetWorth = Math.round(netWorth).toString();
  const billonResult = roundNetWorth[0] + roundNetWorth[1] + roundNetWorth[2];
  return (
    <Link href={`/billion/${id}`}>
      <a>
        {squareImage.includes("undefined") ? (
          <div className="max-w-[270px] max-h-[270px] bg-slate-400" />
        ) : (
          <Image
            src={squareImage}
            alt={id}
            width={416}
            height={416}
            placeholder="blur"
            blurDataURL={squareImage}
          />
        )}
        <span className="text-sm block font-semibold">{name}</span>
        <div className="text-sm">
          <span>{billonResult} billion</span>
          <span> / </span>
          {industries.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </a>
    </Link>
  );
};

export default Item;