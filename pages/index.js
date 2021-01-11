import React from "react";
import Link from "next/link";
import useSWR from "swr";
import PageTitle from "../components/PageTitle";
import { FaSpinner } from "react-icons/fa";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/getPromo", fetcher);

  return (
    <div className='h-full pb-4 '>
      <PageTitle title='Seja Bem-Vindo' />
      <p className='mt-16 text-center'>
        O restaurante X sempre busca por atender melhor seus clientes.
        <br /> Por isso, estamos sempre abertos a ouvir a sua opinião.{" "}
      </p>

      <div className='text-center my-12 p-2'>
        <Link href='/pesquisa'>
          <a className='text-white bg-yellow-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow'>
            Dar opinião ou sugestão
          </a>
        </Link>
      </div>
      {!data && (
        <div className='w-1/5 mx-auto text-center'>
          <FaSpinner className=' inline text-gray-700 text-center animate-spin ' />
        </div>
      )}
      {!error && data && data.showCupom && (
        <div>
          <p className='text-gray-700  font-bold my-12 text-center'>
            {data.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
