import React, { useState } from "react";
import './styles.css';

/// função recebe tempo
const ftime = (t, setT) => {
  return (
    <div className="container">
      <div className="inputTime" >
        <p>Tempo a ser simulado (minutos) : </p>
        <input id="time" type="number" placeholder="Tempo" value={t} min="1" onChange={(e) => { setT(e.target.value) }} />
      </div>
    </div>
  )
}
/// função recebe MAX clientes
const fMax = (m, setMAX) => {
  return (
    <div className="container">
      <div className="inputMAX" >
        <p>Probabilidade de Clientes (MAX) :</p>
        <input type="number" placeholder="MAX" value={m} min="1" max="100"onChange={(e) => { setMAX(e.target.value) }} />
      </div>
    </div>
  )
}
/// pega valores de chegada
const farrive = (arA, setArA) => {
  return (
    <>
      <div className="container2">
        <div className="inputArrives">
          <p>Chegadas (λ) : </p>
          <input type="number" placeholder="A" value={arA} min="1" max="100" onChange={(e) => { setArA(e.target.value) }} />
        </div>
      </div>
      <br></br>
    </>
  )
}
/// pega valores de serviço
const fservice = (seA, setSeA) => {
  return (
    <>
      <div className="container2">
        <div className="inputService">
          <p>Serviços (μ) : </p>
          <input type="number" placeholder="A" value={seA}  min="1" max="100" onChange={(e) => { setSeA(e.target.value) }} />
        </div>
      </div>
      <br></br>
    </>
  )
}
const fcalcular = (t, m, arA, seA, setSr) => {
  var calcMax = {};
  const calc = () => {
    const arrivalRateHour = t / arA;
    const serviceRateHour = t / seA;
    const numAverege = arrivalRateHour / (serviceRateHour - arrivalRateHour);
    const timeAverage = 1 / (serviceRateHour - arrivalRateHour);
    const ocupationAverage = arrivalRateHour / serviceRateHour;
    let prob = 0;
    for (let i = 0; i < m; i++) {
      prob = (1 - (arrivalRateHour / serviceRateHour)) * Math.pow((arrivalRateHour / serviceRateHour), i);
      calcMax[prob.toFixed(2)] = i;
    }
    const results = { arrivalRateHour, serviceRateHour, numAverege, timeAverage, ocupationAverage, calcMax};
    return results;
  }
  const handleClick = () => {
    const result = calc();
    setSr(result);
  }
  return (
    <>
      <div className="button">
        <button className="buttonSimulate" onClick={handleClick}>SIMULAR</button>
      </div>
      <br></br>
    </>

  )
}


const fResult = (r) => {

  const calcmax = r?.calcMax ? Object.values(r.calcMax) : [];
  const tableData = calcmax.map((item, index) => ({
    x: index + 1,
    "P(x)": item,
    A: (1 - (r.arrivalRateHour / r.serviceRateHour)) *
    Math.pow((r.arrivalRateHour / r.serviceRateHour), index),
  }));
  
  return (
    <>
      <h2>Resultado da Simulação:</h2>
      <table border='1' className="simulacao-tabelaa">
        <thead >
          <tr>
            <th>  </th>
            <th> A </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">Chegadas (λ) </td>
            <td>{r.arrivalRateHour}</td>
          </tr>
          <tr>
            <td>Serviços (μ) </td>
            <td>{r.serviceRateHour}</td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <h2>Resultado da Simulação:</h2>
      <table border='1' className="simulacao-tabela">
        <thead>
          <tr>
            <th>  </th>
            <th align="center"> A </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Número Médio de Clientes (L): </td>
            <td>{r.numAverege}</td>
          </tr>
          <tr>
            <td>Tempo Médio de Espera (W): </td>
            <td>{r.timeAverage}</td>
          </tr>
          <tr>
            <td>Taxa de Ocupação do Sistema (ρ) </td>
            <td>{r.ocupationAverage}</td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <h3>Resultado da Simulação:</h3>
      <table border='1' className="simulacao-tabela">
        <thead>
          <tr>
            <th>N </th>
            <th>P(x)</th>
            <th>A</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.x}>
              <td>{item.x}</td>
              <td>{item["P(x)"].toFixed(0)}</td>
              <td>{item.A.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )

}


export default function QueueSimulator() {

  const [serviceTime, setServiceTime] = useState('');
  const [maxProb, setMaxProb] = useState('');
  const [arriveA, setArriveA] = useState('');
  const [serviceA, setServiceA] = useState('');
  const [resultado, setResults] = useState([]);

  return (
    <>
      <h1 className="title" >------Simulação por Modelagem Analítica-----</h1>
      <br></br>
      {ftime(serviceTime, setServiceTime)}
      {fMax(maxProb, setMaxProb)}
      {farrive(arriveA, setArriveA)}
      {fservice(serviceA, setServiceA)}
      {fcalcular(serviceTime, maxProb, arriveA, serviceA, setResults)}
      {fResult(resultado)}


    </>
  );
}
