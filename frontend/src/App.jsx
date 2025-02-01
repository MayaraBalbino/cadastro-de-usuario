import { useState, useRef, useEffect } from 'react'
import React from 'react'
import './App.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';  
import 'primeicons/primeicons.css'; 
import '../node_modules/primeflex/primeflex.css'
import { Card } from "primereact/card";
import { Toast } from "primereact/toast"
import { InputNumber } from "primereact/inputnumber"


function App() {
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cargo: "",
    cpf: "",
  });


  const validateCPF = (cpf) => {
    const regex = /^\d{11}$/;
    return regex.test(cpf);
  };

  const toast = useRef(null);

  const handleChange = (event) =>{
    const{name, value} = event.target;


    setFormData({...formData, [name]: value});
    
    
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateCPF(formData.cpf)) {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'CPF inválido. O CPF deve conter 11 dígitos.',
        life: 3000,
      });
      return; 
    }

    /*Toastify
    
    toast.error('CPF inválido. O CPF deve conter 11 dígitos.', {
      position: "top-center",  // Posição do toast
      autoClose: 3000,         // Tempo de duração
      hideProgressBar: false, // Barra de progresso (opcional)
      closeOnClick: true,     // Fechar ao clicar no toast
      pauseOnHover: true,     // Pausar quando passar o mouse
    });*/
    
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })

      if(response.ok){
        toast.current.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Cadastro realizado com sucesso",
          life: 3000,
        })

        setFormData({
          nome: "", 
          email: "",
          cargo: '',
          cpf: "",
        })
      }else if(response.status === 400){
        toast.current.show({
          severity: "error",
          summary: "Erro",
          detail: "Este CPF já está cadastrado",
          life: 3000,
        })
      }else{
        throw new Error('Erro ao cadastrar usuário')
      }

    } catch (error) {
      console.error('Erro: ', error)
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível cadastrar o usuário',
        life: 3000,
      });
    }
    
  };

  

  return (
    <div className="flex align-items-center justify-content-center min-h-screen surface-ground p-4">
    <Card className="p-6 w-40rem">
      <div className='p-2 justify-center text-4xl'>
        Cadastro de Funcionários
      </div>

      <form onSubmit={handleSubmit} className="flex flex-column gap-3">
        <div className="flex flex-column">
          <label>Nome:</label>
          <InputText
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="p-inputtext-lg"
          />
        </div>

        <div className="flex flex-column">
          <label>E-mail:</label>
          <InputText
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-inputtext-lg"
          />
        </div>

        <div className="flex flex-column">
          <label>Cargo:</label>
          <InputText
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
            className="p-inputtext-lg"
          />

          <div className='flex flex-column'>
            <label>CPF:</label>
            <InputText
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            
            />

          </div>
        </div>

        <div className='flex justify-content-center m-2'>
        <Button type="submit" label="Cadastrar" icon="pi pi-check" className="p-button-primary" />
      </div>

      </form>

      
      
    </Card>
    <Toast ref={toast} />
    </div>
  );
}


export default App
