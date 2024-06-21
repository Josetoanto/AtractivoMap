    import Grafo from "../models/Grafo.mjs";

    const atractivosMap = new Grafo();

    const agregarBtton = document.getElementById('newAtractivo_button');
    agregarBtton.addEventListener('click', () => {
        const cityNameInput = document.getElementById('newAtractivo_input');
        const cityName = cityNameInput.value.trim();

        if (!verificarCampoVacio(cityName, 'Nombre del atractivo')) {
            return;
        }

        atractivosMap.addV(cityName);
        swal("Atractivo turístico agregado con éxito");
        console.log(`Vértice agregado: ${cityName}`);
        limpiarInput(cityNameInput);
    });

        const agregarAristaBtton = document.getElementById('agregarAristaBtn');
        agregarAristaBtton.addEventListener('click', () => {
        const pointAInput = document.getElementById('atractivoA_input');
        const pointBInput = document.getElementById('atractivoB_input');
        const weightInput = document.getElementById('distaciaEntreVertices_input');

        const pointA = pointAInput.value.trim();
        const pointB = pointBInput.value.trim();
        const weight = parseInt(weightInput.value);

        if (!verificarCampoVacio(pointA, 'Atractivo A') ||
            !verificarCampoVacio(pointB, 'Atractivo B') ||
            isNaN(weight)) {
            return;
        }

        atractivosMap.addConexion(pointA, pointB, weight);
        atractivosMap.printMatrizAristas()
        swal("Distancia agregada con éxito");
        console.log(`Arista de ${pointA} a ${pointB} con peso ${weight}`);
        limpiarInput(pointAInput);
        limpiarInput(pointBInput);
        limpiarInput(weightInput);
    });

    const recorridoProfundidad = document.getElementById('recorridoProfundidadBtn');
    recorridoProfundidad.addEventListener('click', () => {
        if(atractivosMap.getSize!=0){
        const recorrido = [];
        atractivosMap.busquedaProfundidad((callback) => {
            recorrido.push(callback);
            console.log(callback);
            swal(recorrido.join());
        });
        } else {
            swal ("Lista vacia!")
        }
    });

    const buscarRutaMasCorta = document.getElementById('buscarRutaMasCorta_Btn');
    buscarRutaMasCorta.addEventListener('click', () => {
        if(atractivosMap.getSize!=0){
        if (atractivosMap.getSize>0){}
        const puntoAinput = document.getElementById('puntoA_input');
        let puntoA = puntoAinput.value.trim();

        if (!verificarCampoVacio(puntoA, 'Punto A')){
            return;
            }
            puntoA = puntoA.toString();
           atractivosMap.dijkstra(puntoA, (distances) => {
                let mensaje = "Caminos mas cortos desde " + puntoA +"\n" 
                for (let indice in distances) {
                mensaje += `${indice}: ${distances[indice]} \n` 
                }
                swal(mensaje)
            });
        } else {
            swal ("Lista vacia!")
        }
    });
    

    const verificarCampoVacio = (valor, mensaje) => {
        if (!valor) {
            swal(`¡Error! ${mensaje} no puede estar vacío.`);
            return false;
        }
        return true;
    };

    const limpiarInput = (inputElement) => {
        inputElement.value = '';
    };
