import React, { useState } from 'react'
import styles from '../styles/apply.module.css'
import Footer from '../components/Footer';
import {toast} from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Apply = () => {

  const router = useRouter();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res=> res.json()).then(data=>{
      if(data.status === 'success'){ 
        toast('Usuario encontrado!');
        localStorage.setItem('CatalogolinkToken', data.token);
        router.push('/dashboard');
      }
       if
       (data.status === 'not found'){
         toast.error('Usuario Não Encontrado');
       }
     }).catch(err => {
       console.log(err);
     });

  }
  return (
    <>
      <section className={styles.background + " min-h-screen flex justify-center items-center"}>
        <div className="main">
          <div className="content bg-white border-2 px-3 py-8 rounded-2xl shadow-lg">
            <p className="font-bold text-center">Seja bem vindo novamente!</p>
            <h6 className='text-2x1 fontsize(120) text-center py-2 font-bold  text-gray-600'>Realize seu Login:</h6>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 text-lg mt-5'>

               <span className='flex flex-row shadown-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <img className='w-6 mr-2'src="/svg/email.svg" alt="" />
                <input value={email} onChange={e=>setEmail(e.target.value)} className='focus:outline-none' type="email" placeholder='Informe seu email' required/>
              </span>

              <span className='flex flex-row shadown-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <img className='w-6 mr-2'src="/svg/lk.svg" alt="" />
                <input value={password} onChange={e=>setPassword(e.target.value)} className='focus:outline-none' type="password" placeholder='Crie uma senha'required/>
              </span>
            
              <input className=" justify-center bg-green-700 text-center text-white py-2 rounded-lg" cursor-pointer type="submit" value="Login"/>
              
            </form>
            
          </div>
            <h4 className='text-center pt-3 text-white'>Novo Aqui?<Link className='font-bold text-red-300' href="/apply"> Cadastrar</Link></h4>
        </div>
      </section>
    </>
  )
}

export default Apply