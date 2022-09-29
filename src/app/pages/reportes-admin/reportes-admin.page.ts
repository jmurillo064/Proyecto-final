import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RoyaService } from 'src/app/servicios/roya.service';

@Component({
    selector: 'app-reportes-admin',
    templateUrl: './reportes-admin.page.html',
    styleUrls: ['./reportes-admin.page.scss'],
})
export class ReportesAdminPage implements OnInit {

    private miGrafico: Chart;
    private miGrafico2: Chart;
    arrayRegistros: any;
    siRoya: any;
    noRoya: any;

    constructor(private royaService: RoyaService) { }

    ngOnInit() {
        this.cargarRegistros();
    }

    cargarRegistros(){
        this.royaService.traerRegistros().then(data=>{
            //this.arrayRegistros = JSON.stringify(data);
            this.arrayRegistros = (data);
            console.log(this.arrayRegistros);
            this.noRoya = this.arrayRegistros.filter(valor => valor.presenciaRoya == 0).length;
            this.siRoya = this.arrayRegistros.filter(valor => valor.presenciaRoya == 1).length;
            console.log(this.arrayRegistros.filter(valor => valor.presenciaRoya == 1).length);
            
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
                labels: ['Si roya', 'No roya'],
                datasets: [{
                    label: 'My First Dataset',
                    data: [this.siRoya, this.noRoya,0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)'
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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)'
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
