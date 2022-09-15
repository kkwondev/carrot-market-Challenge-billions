import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";

interface detailProps {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  about: string[];
  bio: string[];
  netWorth: number;
  position: number;
  thumbnail: string;
  squareImage: string;
  industries: string[];
  financialAssets: {
    companyName: string;
    currencyCode: string;
    currentPrice: number;
    exchange: string;
    exchangeRate: number;
    interactive: boolean;
    numberOfShares: number;
    sharePrice: number;
    ticker: string;
    exerciseOptionPrice?: number;
  }[];
}

const BillionDetail = ({ detail }: { detail: detailProps }) => {
  console.log(detail);

  const roundNetWorth = Math.round(detail.netWorth).toString();
  const billonResult = roundNetWorth[0] + roundNetWorth[1] + roundNetWorth[2];

  return (
    <div className="text-white">
      <div>
        <Image
          src={detail.squareImage}
          alt={detail.id}
          width={416}
          height={416}
          placeholder="blur"
          blurDataURL={detail.squareImage}
        />
        <div className="mb-10">
          <h3 className="block mt-10 mb-7 font-semibold text-3xl">
            {detail.name}
          </h3>
          <p>
            <strong className="text-lg font-semibold">Networth:</strong>{" "}
            {billonResult} Billion
          </p>
          <p>
            <strong className="text-lg font-semibold">Country:</strong>{" "}
            {detail.country}
          </p>
          <p>
            <strong className="text-lg font-semibold">Industries:</strong>{" "}
            {detail.industries.map((item: string, i: number) => (
              <span key={i}>{item}</span>
            ))}
          </p>
        </div>
        <div className="mb-10">
          {detail.bio.map((row, i) => (
            <p key={i} className="text-lg">
              {row}
            </p>
          ))}
        </div>
      </div>
      {detail.financialAssets ? (
        <div>
          <h3 className="text-3xl font-semibold mb-5">Financial Assets</h3>
          <div className="grid grid-cols-4 gap-10">
            {detail.financialAssets?.map((item, i) => (
              <div
                key={i}
                className="border border-slate-300 px-5 py-5 rounded-xl"
              >
                <p>
                  <strong>Ticker: </strong>
                  {item.ticker}
                </p>
                <p>
                  <strong>Shares: </strong>
                  {item.numberOfShares.toLocaleString()}
                </p>
                <p>
                  {item.exerciseOptionPrice ? (
                    <strong>
                      Excersie Price: ${item.exerciseOptionPrice}{" "}
                    </strong>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const { id } = context.params;
  }

  try {
    if (context.params) {
      const { id } = context.params;
      const { data }: { data: detailProps } = await axios({
        method: "GET",
        url: `https://billions-api.nomadcoders.workers.dev/person/${id}`,
      });
      return {
        props: { detail: data },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default BillionDetail;
