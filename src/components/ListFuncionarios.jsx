import React, { useCallback, useEffect, useState } from "react";

export default function ListFuncionarios(props) {
  const { funcionarios, onClickDelete } = props;
  const [sorted, setSorted] = useState(funcionarios);
  const [sortingBy, setSortingBy] = useState("");
  const [desc, setDesc] = useState(false);
  const [max, setMax] = useState(0);

  const sortBy = useCallback(
    (arr) => {
      const f = (a, b) => {
        if (a[sortingBy] < b[sortingBy]) {
          return desc ? 1 : -1;
        }
        if (a[sortingBy] > b[sortingBy]) {
          return desc ? -1 : 1;
        }
        return 0;
      };
      if (arr[0] && sortingBy in arr[0]) {
        const x = arr.sort(f);
        console.log(x);
        return x;
      }
      return arr;
    },
    [sortingBy, desc]
  );

  const filterBy = useCallback(
    (arr) => {
      if (max) return arr.filter((e) => e.salario > max);
      return arr;
    },
    [max]
  );

  useEffect(() => {
    setDesc(sortingBy !== "salario");
  }, [sortingBy]);

  useEffect(() => {
    setSorted(filterBy(sortBy(funcionarios)));
  }, [filterBy, funcionarios, sortBy]);

  console.table(sorted);

  const renderFuncionarios = () =>
    sorted.map((f, i) => {
      console.log("rendering");
      return (
        <div key={f.id}>
          <div className="funcionario-column-id">{i}</div>
          <div>{f.cpf}</div>
          <div>{f.nome}</div>
          <div>{f.cargo}</div>
          <div>{f.salario}</div>
          <div>
            <button onClick={() => onClickDelete(f.id)}>deletar</button>
          </div>
        </div>
      );
    });

  return (
    <>
      <div className="buttons">
        <input
          type="button"
          onClick={() => setSortingBy("cpf")}
          value="Ordenar por CPF"
        />
        <input
          type="button"
          onClick={() => setSortingBy("nome")}
          value="Ordenar por Nome"
        />
        <input
          type="button"
          onClick={() => setSortingBy("salario")}
          value="Ordenar por Salario (DESC)"
        />
        <input
          placeholder="Salário maior que..."
          type="number"
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      <div className="table-container">
        <div className="table-header">
          <div className="funcionario-column-id"></div>
          <div>Cpf</div>
          <div>Nome</div>
          <div>Cargo</div>
          <div>Salario</div>
          <div></div>
        </div>
        <div className="table-body">{renderFuncionarios()}</div>
      </div>
    </>
  );
}
