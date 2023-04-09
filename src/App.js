import React, { useState } from 'react';
import MM1Simulation from './MM1Simulation';

function App() {

  const [lambda, setLambda] = useState(0);
  const [mu, setMu] = useState(0);
  const [simulationTime, setSimulationTime] = useState(0);
  const [averageWaitTime, setAverageWaitTime] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const simulation = new MM1Simulation(parseFloat(lambda), parseFloat(mu));
    const waitTime = simulation.startSimulation(parseFloat(simulationTime));
    setAverageWaitTime(waitTime.toFixed(2));
  };

  return (
    <div>
      <h2>Simulação de filas M/M/1</h2>
      <br></br>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="lambda">Chegada:     </label>
          <input
            type="number"
            id="lambda"
            name="lambda"
            value={lambda}
            onChange={(event) => setLambda(event.target.value)}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="mu">Serviço: </label>
          <input
            type="number"
            id="mu"
            name="mu"
            value={mu}
            onChange={(event) => setMu(event.target.value)}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="simulationTime">Tempo de simulação:  </label>
          <input
            type="number"
            id="simulationTime"
            name="simulationTime"
            value={simulationTime}
            onChange={(event) => setSimulationTime(event.target.value)}
            required
          />
        </div>
        <br></br>
        <br></br>
        <button type="submit">Simular</button>
      </form>
      {averageWaitTime && (
        <p>O tempo médio de espera dos clientes na fila é de {averageWaitTime} unidades de tempo.</p>
      )}
    </div>
  );
}

export default App;