import axios from "axios";
import { spawn } from "child_process";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Item from "../components/item";
import styles from "../styles/Home.module.css";

export interface billion {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

const Home: NextPage = ({
  billions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="grid grid-cols-4 gap-10 tracking-tight text-white">
      {billions.map((billion: billion, i: number) => (
        <Item
          id={billion.id}
          name={billion.name}
          squareImage={billion.squareImage}
          netWorth={billion.netWorth}
          industries={billion.industries}
          key={i}
        />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: billions }: { data: billion[] } = await axios({
      method: "GET",
      url: "https://billions-api.nomadcoders.workers.dev/",
    });

    if (!billions) {
      return {
        notFound: true,
      };
    }
    return {
      props: { billions },
    };
  } catch (e) {
    console.error(e);

    return {
      notFound: true,
    };
  }
};

export default Home;
