const SimJS = require('./sim.js');


class MM1Simulation {

  constructor(lambda, mu) {
    this.lambda = lambda; // taxa de chegada dos clientes
    this.mu = mu; // taxa de atendimento do atendente
    this.queue = []; // fila de clientes
    this.serverBusy = false; // indica se o atendente está ocupado ou não
    this.waitTime = 0; // tempo total de espera dos clientes na fila
    this.numCustomers = 0; // número total de clientes atendidos
  }

  startSimulation(simulationTime) {
    const sim = new SimJS();

    // processo de chegada dos clientes
    sim.addEntityGenerator('customer', (queue) => {
      queue.push(sim.time()); // adiciona o cliente na fila
      if (!this.serverBusy) {
        this.serverBusy = true;
        sim.schedule('server', 0); // agenda o atendimento imediatamente
      }
    }, this.queue);

    // processo de atendimento pelo atendente
    sim.addAction('server', (queue) => {
      queue.shift(); // remove o cliente atendido da fila
      if (queue.length > 0) {
        sim.schedule('server', 1 / this.mu); // agenda o atendimento do próximo cliente
      } else {
        this.serverBusy = false;
      }
      this.numCustomers++;
      this.waitTime += sim.time() - queue[0]; // calcula o tempo de espera do cliente atendido
    }, this.queue);

    // inicia a simulação
    sim.simulate(simulationTime);

    // retorna o tempo médio de espera
    return this.waitTime / this.numCustomers;
  }
}

export default MM1Simulation;