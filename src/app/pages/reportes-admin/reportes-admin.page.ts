import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PersonaService } from 'src/app/servicios/persona.service';
import { RoyaService } from 'src/app/servicios/roya.service';

@Component({
    selector: 'app-reportes-admin',
    templateUrl: './reportes-admin.page.html',
    styleUrls: ['./reportes-admin.page.scss'],
})
export class ReportesAdminPage implements OnInit {

    private miGrafico: Chart;
    private miGrafico2: Chart;
    arrayUsuarios: any;
    // Seleccionamos o iniciamos el valor '0' del <select>
    opcionSeleccionado: string  = '0';
    verSeleccion: string        = '';
    arrayRegistros: any;
    //registros
    arrayRegistrosUsuarios: any;
    siRoya: any;
    noRoya: any;
    roya1 : any;
    roya2 : any;
    roya3 : any;
    roya4 : any;

    constructor(private royaService: RoyaService,
        private personService: PersonaService) { }

    ngOnInit() {
        this.cargarUsuarios();
        this.cargarRegistros();
    }

    cargarUsuarios(){
        this.personService.traerUsuarios().then(data=>{
            this.arrayUsuarios = data['data'];
            console.log(this.arrayUsuarios);
        }).catch(error =>{
            console.log(error);
        });
    }

    cargarRegistros(){
        this.royaService.traerRegistros().then(data=>{
            //this.arrayRegistros = JSON.stringify(data);
            this.arrayRegistros = (data);
            console.log(this.arrayRegistros);
            this.noRoya = this.arrayRegistros.filter(valor => valor.presenciaRoya == 0).length;
            this.siRoya = this.arrayRegistros.filter(valor => valor.presenciaRoya == 1).length;
            this.roya1 = this.arrayRegistros.filter(valor => valor.nivelRoya == 1).length;
            this.roya2 = this.arrayRegistros.filter(valor => valor.nivelRoya == 2).length;
            this.roya3 = this.arrayRegistros.filter(valor => valor.nivelRoya == 3).length;
            this.roya4 = this.arrayRegistros.filter(valor => valor.nivelRoya == 4).length;
            console.log(this.arrayRegistros.filter(valor => valor.presenciaRoya == 1).length);
            
            //llenar gráficos
            this.graficoCirculo();
            this.grafico();
        }).catch(error =>{
            console.log(error);
        });
    }

    cargarRegistrosPorUsuarios(id){
        console.log(id);
        this.royaService.traerRegistros().then(data=>{
            //this.arrayRegistros = JSON.stringify(data);
            this.arrayRegistros = (data);
            console.log(this.arrayRegistros);
            this.arrayRegistrosUsuarios = this.arrayRegistros.filter(valor => valor.idPersona == id);
            this.noRoya = this.arrayRegistrosUsuarios.filter(valor => valor.presenciaRoya == 0).length;
            this.siRoya = this.arrayRegistrosUsuarios.filter(valor => valor.presenciaRoya == 1).length;
            this.roya1 = this.arrayRegistrosUsuarios.filter(valor => valor.nivelRoya == 1).length;
            this.roya2 = this.arrayRegistrosUsuarios.filter(valor => valor.nivelRoya == 2).length;
            this.roya3 = this.arrayRegistrosUsuarios.filter(valor => valor.nivelRoya == 3).length;
            this.roya4 = this.arrayRegistrosUsuarios.filter(valor => valor.nivelRoya == 4).length;
            console.log(this.arrayRegistrosUsuarios.filter(valor => valor.presenciaRoya == 1).length);
            
            //llenar gráficos
            this.graficoCirculo();
            this.grafico();
        }).catch(error =>{
            console.log(error);
        });
    }

    grafico(){
        const ctx = document.getElementById('chart');
        this.miGrafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['N-1', 'N-2', 'N-3', 'N-4'],
                datasets: [{
                    label: 'Niveles de afectación',
                    data: [this.roya1, this.roya2, this.roya3, this.roya4, 0],
                    backgroundColor: [
                        'rgba(255, 158, 129, 0.5)',
                        'rgba(255, 123, 90, 0.5)',
                        'rgba(255, 82, 50, 0.5)',
                        'rgba(255, 0, 0, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 158, 129, 1)',
                        'rgba(255, 123, 90, 1)',
                        'rgba(255, 82, 50, 1)',
                        'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }, 
                },
                title: {
                    display: true,
                    text: 'Niveles de Roya',
                }
            }
        });
    }

    // grafico(){
    //     const ctx = document.getElementById('chart');
    //     this.miGrafico = new Chart(ctx, {
    //         type: 'bubble',
    //         data: {
    //             datasets: [{
    //                 label: 'I love you',
    //                 data: [{x: 0, y: 2},{x: 1, y: 3},{x: 1, y: 1},
    //                     {x: 2, y: 0},{x: 2, y: 2},{x: 3, y: 3},
    //                     {x: 3, y: 1},{x: 4, y: 2},],
    //                 backgroundColor: 'rgb(255, 99, 132)'
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true
    //                 }, 
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Niveles de Roya',
    //             }
    //         }
    //     });
    // }

    graficoCirculo(){
        const ctx = document.getElementById('chartCirculo');
        //const sinRoya = this.arrayRegistros.filter(m => m.presenciaRoya == 0);
        
        this.miGrafico2 = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Si roya', 'No roya'],
                datasets: [{
                    label: 'My First Dataset',
                    data: [this.siRoya, this.noRoya],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 255, 0, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 1)',
                        'rgba(0, 255, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                title: {
                    display: true,
                    text: 'Niveles de Roya',
                }
            }
        });
    }

}
