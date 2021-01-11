import React, { useState } from "react";
import Link from "next/link";
import PageTitle from "../components/PageTitle";
import { Emoji } from "emoji-mart";
import { FaSpinner } from "react-icons/fa";
import InputMask from "react-input-mask";

const Pesquisa = () => {
  const [success, setSuccess] = useState(false);
  const [validate, setValidate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [retorno, setRetorno] = useState({});
  const [form, setForm] = useState({
    Nome: "",
    Email: "",
    Whatsapp: "",
    Nota: "",
  });

  const notas = [
    { nota: 1, emoji: "face_vomiting" },
    { nota: 2, emoji: "nauseated_face" },
    { nota: 3, emoji: "neutral_face" },
    { nota: 4, emoji: "slightly_smiling_face" },
    { nota: 5, emoji: "yum" },
    { nota: 6, emoji: "drooling_face" },
  ];

  const onChangeValue = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const save = async () => {
    setLoading(true);
    let emptyFields = 0;
    Object.keys(form).map(function (key, index) {
      if (form[key] == "") {
        emptyFields += 1;
      }
    });
    if (emptyFields !== 0) {
      setValidate(false);
    } else {
      setValidate(true);
      try {
        const response = await fetch("/api/save", {
          method: "POST",
          body: JSON.stringify(form),
        });

        const data = await response.json();
        setSuccess(true);
        setForm({
          Nome: "",
          Email: "",
          Whatsapp: "",
          Nota: "",
        });
        setRetorno(data);
        console.log("Data: ", data);
      } catch (err) {
        console.log("Erro: ", err);
      }
    }

    setLoading(false);
  };

  return (
    <div className='pt-2'>
      <PageTitle title='Pesquisa' />

      {!validate && (
        <div className='w-96 mx-auto'>
          <p className='mb-6 text-center bg-red-300 px-4 py-3 font-bold'>
            Todos os campos devem ser preenchidos.{" "}
          </p>
        </div>
      )}

      {!success && (
        <>
          <h1 className='text-gray-700 text-center font-bold my-2 text-2xl'>
            Críticas e sugestões
          </h1>
          <p className='text-center mb-6'>
            O restaurante X sempre busca por atender melhor seus clientes.
            <br /> Por isso, estamos sempre abertos a ouvir a sua opinião.{" "}
          </p>
          <div className='w-80 mx-auto'>
            <label className='font-bold text-gray-700 '>Nome:</label>
            <input
              className='p-4 block shadow bg-white bg-opacity-75  my-2 rounded-lg w-full'
              type='text'
              onChange={onChangeValue}
              name='Nome'
              value={form.Nome}
            />
            <label className='font-bold text-gray-700 '>E-mail:</label>
            <input
              className='p-4 block shadow bg-white bg-opacity-75 my-2 rounded-lg w-full'
              type='text'
              onChange={onChangeValue}
              name='Email'
              value={form.Email}
            />
            <label className='font-bold text-gray-700 '>Whatsapp:</label>
            <InputMask
              className='p-4 block shadow bg-white bg-opacity-75 my-2 rounded-lg w-full'
              type='text'
              onChange={onChangeValue}
              name='Whatsapp'
              mask='(99)99999-9999'
              value={form.Whatsapp}
            />
            <label className='font-bold text-gray-700 '>
              Deixe sua avaliação:
            </label>
            <div className='flex p-2'>
              {notas.map((nota) => {
                return (
                  <label
                    className='block w-1/6 text-center text-gray-500 font-bold'
                    key={nota.nota}
                  >
                    <Emoji
                      emoji={nota.emoji}
                      set='google'
                      size={32}
                      key={nota.emoji}
                    />
                    <br />
                    <input
                      type='radio'
                      name='Nota'
                      value={nota.nota}
                      onChange={onChangeValue}
                      className='text-4xl'
                      key={nota.nota}
                    />
                  </label>
                );
              })}
            </div>

            <button
              className='inline text-white bg-yellow-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow w-full my-6'
              onClick={save}
            >
              {!loading && <span>Enviar</span>}
              {loading && (
                <FaSpinner className=' inline text-white-600 text-center animate-spin ' />
              )}
            </button>
          </div>
        </>
      )}

      {success && (
        <div className='w-80 mx-auto'>
          <p className='mb-6 text-center bg-yellow-200 px-4 py-3 font-bold'>
            Obrigado por contribuir com sua sugestão ou crítica.{" "}
          </p>
          {retorno.showCupom && (
            <>
              <div className='bg-blue-400 text-center border p-4 mb-4 '>
                Seu cupom: <br />
                <span className='font-bold text-2xl'>{retorno.Cupom}</span>
              </div>
              <div className='bg-yellow-200 text-center border p-4 mb-4'>
                <br />
                <span className='font-bold block mb-2'>{retorno.Promo}</span>
                <br />
                <span className='italic'>
                  {" "}
                  Tire um print ou foto desta tela e apresente ao garçom.
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Pesquisa;
