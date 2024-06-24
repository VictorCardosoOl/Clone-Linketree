import React, { useState } from 'react'
import styles from '../styles/apply.module.css'
import {toast} from 'react-toastify';
import Footer from "../components/Footer";
import Link from 'next/link';
import { useRouter } from 'next/router';

const apply = () => {

  const router = useRouter();
  const[handle, setHandles] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[category, setCategory] = useState('');
  const[submitted, setSubmitted] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }
  const handleRegister = (e) => {
    e.preventDefault();
    if(!category) return toast.error('Selecione a ategoria!');
    //backend
    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        handle,
        email,
        password,
        category
      })
    }).then(res=> res.json()).then(data=>{
      if(data.status === 'success'){ 
        toast('Cadastro realizado com sucesso!');
        localStorage.setItem('CatalogolinkToken', data.token);
        setSubmitted(true);
        router.push('/login');
      }
    }).catch(err =>{ 
      toast.error('Tente usar um nome diferente!');
    });
  }
  return (
    <>
      <section className={styles.background + " min-h-screen flex justify-center items-center"}>
        <div className="main">
          <div className="content bg-white border-2 px-3 py-8 rounded-2xl shadow-lg">
            <p className="font-bold text-center">Seja bem vindo!</p>
            <h6 className='text-2x1 fontsize(120) text-center py-2 font-bold  text-gray-600'>Crie seu portfólio de links.</h6>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 text-lg mt-5'>
              
              <span className='flex flex-row shadown-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <img className='w-6 mr-2'src="/svg/ig.svg" alt="" />
                <input value={handle} onChange={e=>setHandles(e.target.value)} className='focus:outline-none' type="text" placeholder='Nome de Usuario'required/>
              </span>

              <span className='flex flex-row shadown-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <img className='w-6 mr-2'src="/svg/email.svg" alt="" />
                <input value={email} onChange={e=>setEmail(e.target.value)} className='focus:outline-none' type="email" placeholder='Informe seu email' required/>
              </span>

              <span className='flex flex-row shadown-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <img className='w-6 mr-2'src="/svg/lk.svg" alt="" />
                <input value={password} onChange={e=>setPassword(e.target.value)} className='focus:outline-none' type="password" placeholder='Crie uma senha'required/>
              </span>
            
            <h5 className='text-sm text-center text-green-600'>Tipo de Conta</h5>
              <span className="flex justify-center">
                <label className="flex flex-row mr-3">
                  <input type="checkbox" className="" value="Criador" checked={category==='Criador'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Criador</p>
                </label>
                <label className="flex flex-row mr-3">
                  <input type="checkbox" className="" value="Agencia" checked={category==='Agencia'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Agencia</p>
                </label>
                <label className="flex flex-row mr-3">
                  <input type="checkbox" className="" value="Marca" checked={category==='Marca'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Marca</p>
                </label>
              </span>
              <input className=" justify-center bg-green-700 text-center text-white py-2 rounded-lg" cursor-pointer type="submit" value="Cadastrar"/>
              
            </form>
          </div>
          <h4 className='text-center pt-3 text-white'>Já possui cadastro? <Link className='font-bold text-red-300' href="/login"> Logar</Link></h4>
        </div>
      </section>
    </>
  )
}

export default apply