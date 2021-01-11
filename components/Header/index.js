import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className='mx-auto'>
          <Link href='/'>
            <a>
              <img
                className='mx-auto'
                src='/logo_palpitebox.png'
                alt='PalpiteBox'
              />
            </a>
          </Link>
        </div>
      </div>
      <div className='bg-black p-4 shadow-md text-center'>
        <Link href='/sobre'>
          <a className='px-2 hover:underline text-gray-500'>Sobre</a>
        </Link>

        <Link href='/contato'>
          <a className='px-2 hover:underline text-gray-500'>Contato</a>
        </Link>

        <Link href='/pesquisa'>
          <a className='px-2 hover:underline text-gray-500'>Pesquisa</a>
        </Link>
      </div>
    </React.Fragment>
  );
};
export default Header;
