import LinkedList from './LinkedList.mjs';
export class Grafo {
    #matrizAdyacencia = [];
    #map = new Map();
    #matrizAristas = []

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(value, this.#matrizAdyacencia.length - 1);
        }
    }
    addV(value) {
        this.#matrizAdyacencia.push(new LinkedList());
        this.#map.set(value, this.#matrizAdyacencia.length - 1);
    }

    printMatrizAristas() {
        console.log("#matrizAristas:");
        for (let i = 0; i < this.#matrizAristas.length; i++) {
          if (this.#matrizAristas[i]) {
            console.log(`${Array.from(this.#map.keys())[i]}: ${this.#matrizAristas[i].join(" ")}`);
          } else {
            console.log(`${Array.from(this.#map.keys())[i]}: []`);
          }
        }
      }

    getSize(){
        return this.#matrizAdyacencia.length
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
          this.#matrizAdyacencia[this.#map.get(start)].push(end, weight);
          if (!this.#matrizAristas[this.#map.get(start)]) {
            this.#matrizAristas[this.#map.get(start)] = new Array(this.#matrizAdyacencia.length).fill(0);
          }
          if (!this.#matrizAristas[this.#map.get(end)]) {
            this.#matrizAristas[this.#map.get(end)] = new Array(this.#matrizAdyacencia.length).fill(0);
          }
          this.#matrizAristas[this.#map.get(start)][this.#map.get(end)] = weight;
          this.#matrizAristas[this.#map.get(end)][this.#map.get(start)] = weight;
          return true;
        }
        return false;
      }

    bfs(callback){
        let queue = []
        let list = []
        const entries = [...structuredClone(this.#map)];
        for (let i=0; i<this.#matrizAdyacencia.length;i++)
            list[i] = false
        
        let [key] = entries[0]
        queue.push(key)
        
        while (queue.length > 0) {
            let val = queue.shift() 
            callback(val) 
            list[this.#map.get(val)] = true 
            for (let i=0;i<this.#matrizAdyacencia[this.#map.get(val)].length;i++) {
                if (this.#matrizAdyacencia[this.#map.get(val)][i]){
                    let [key] = entries[i]
                    if (!list[this.#map.get(key)] && !queue.includes(key)) 
                        queue.push(key) 
                }
            }
        }

    }

    busquedaProfundidad(callback) {
      let pila = [];  
      let lista = []; 
      const entries = [...structuredClone(this.#map)]; 
      for (let i = 0; i < this.#matrizAdyacencia.length; i++)
          lista[i] = false; 
      let [indexCero] = entries[0]; 
      pila.push(indexCero); 
      while (pila.length > 0) {
          let val = pila.pop(); 
          if (!lista[this.#map.get(val)]) { 
              callback(val); 
              lista[this.#map.get(val)] = true; 
              let vecinosEncontrados = [...this.#matrizAdyacencia[this.#map.get(val)].indice()];
              for (let i = vecinosEncontrados.length - 1; i >= 0; i--) {
                  let vecino = vecinosEncontrados[i];
                  if (!lista[this.#map.get(vecino)]) 
                      pila.push(vecino); 
              }
          }
      }
  }
  dijkstra(start,callback) {
    let L = []; //Vertices las cuales ya se les conoce su ruta mas rapida
    let V = structuredClone(this.#matrizAristas); //Matriz clon de aristas de adyacencia (Matriz del grafo pue)
    let Lprima = [...this.#map.keys()]; //Conjunto de vertices que no se conoce la ruta mas rapida 
    let D = new Array(this.getSize()).fill(Infinity); //Matriz donde mantenemos el peso de las rutas mas rapidas
  
    // Establecer nodo de inicio pai
    D[this.#map.get(start)] = 0; 
  
    // Dijkstra
    //Paso 1 Mientras haya vértices cuyas rutas más rápidas no se conocen
    while (Lprima.length > 0) { 
      let minIndex = -1; //Indice del vertice con la distancia minima
      let minDistance = Infinity; //Distancia minima encontrada

       // Encontrar el vértice en Lprima con la menor distancia en D (Al iniciar tambien sirve para encontrar el vertice inicial)
      for (let i = 0; i < Lprima.length; i++) {
        if (D[i] < minDistance) {
            console.log (D[i] +" es menor que " + minDistance + " Ahora el indice del vertice minimo sera " + i)
          minDistance = D[i];
          minIndex = i;
        } else {
            console.log(D[i] +" es mayor o igual que " + minDistance)
        }
        console.log(D[i])
        console.log(minDistance)
      }
      console.log("Minima distancia " + minDistance)
      console.log("Indice minimo " + minIndex)
      //U es el vertice con distancia minima en D
      let u = Lprima[minIndex]; 
      L.push(u); 
      Lprima.splice(minIndex, 1); 

      // Actualizar distancias mínimas a los vértices adyacentes de `u`
      for (let j = 0; j < this.getSize(); j++) { 
        if (V[this.#map.get(u)][j]!= 0) { 
            console.log(D)
          if (D[j] > D[this.#map.get(u)] + V[this.#map.get(u)][j]) { 
            console.log("La distancia " + (D[this.#map.get(u)] + V[this.#map.get(u)][j]) + " es menor que " + D[j] )
            D[j] = D[this.#map.get(u)] + V[this.#map.get(u)][j]; 
            console.log(D)
          } else {
            console.log("La distancia " + (D[this.#map.get(u)] + V[this.#map.get(u)][j]) + " es mayor que " + D[j] )
          }
        }
      }
    }
    // Converti D a su objeto correspondiente donde La clave de la propiedad es el nombre 
    // del vértice correspondiente al índice i, y el valor es la distancia mínima almacenada en D[i].
    let distances = {};
    for (let i = 0; i < D.length; i++) {
      distances[Array.from(this.#map.keys())[i]] = D[i];
    }
    callback(distances);
  }
}

export default Grafo
