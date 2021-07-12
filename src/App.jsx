import "./App.css";
import FormInput from "./components/FormInput";
import ListFuncionarios from "./components/ListFuncionarios";
import { useState, useRef } from "react";

function App() {
  const [cpf, setCPF] = useState(0);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState(0);
  const lastId = useRef(0);

  const [funcionarios, setFuncionarios] = useState([]);

  const deleteFuncionario = (id) => {
    setFuncionarios((state) => state.filter((e) => e.id !== id));
  };

  const addFuncionario = (e) => {
    setFuncionarios((state) => [
      ...state,
      { cpf, nome, cargo, salario, id: lastId.current },
    ]);
    lastId.current++;
    e.preventDefault();
  };

  return (
    <>
      <h1>Exemplo de Manipulação de Array e Objetos em JavaScript</h1>
      <form onSubmit={addFuncionario}>
        <fieldset>
          <legend>Manutenção de Funcionários</legend>
          <div>Por favor, preencha os dados abaixo</div>
          <div className="form-container">
            <FormInput
              required
              onChange={(e) => setCPF(parseInt(e))}
              label="CPF:"
              id="cpf"
              type="number"
            />
            <FormInput required onChange={setNome} label="Nome:" id="nome" />
            <FormInput required onChange={setCargo} label="Cargo:" id="cargp" />
            <FormInput
              required
              onChange={(e) => setSalario(parseInt(e))}
              label="Salário:"
              id="salario"
              type="number"
            />
            <input type="submit" value="Adicionar" />
          </div>
        </fieldset>
      </form>

      <h1>Lista de Funcionários</h1>
      <ListFuncionarios
        funcionarios={funcionarios}
        onClickDelete={deleteFuncionario}
      />
    </>
  );
}

export default App;
