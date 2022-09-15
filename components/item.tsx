import { NextPage } from "next";
import Link from "next/link";
import { billion } from "../pages";
import Image from "next/image";

const Item = ({ id, name, squareImage, netWorth, industries }: billion) => {
  const roundNetWorth = Math.round(netWorth).toString();
  const billonResult = roundNetWorth[0] + roundNetWorth[1] + roundNetWorth[2];

  return squareImage !== "https:undefined" ? (
    <Link href={`/billion/${id}`}>
      <a className="hover:scale-105 transition-all">
        <Image
          src={squareImage}
          alt={id}
          width={416}
          height={416}
          placeholder="blur"
          blurDataURL={squareImage}
        />
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
  ) : null;
};

export default Item;
