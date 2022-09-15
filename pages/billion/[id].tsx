import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

const BillionDetail: NextPage = () => {
  return <div>1</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://billions-api.nomadcoders.workers.dev/person/elon-musk",
    });

    console.log(data);

    return {
      props: {},
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default BillionDetail;
