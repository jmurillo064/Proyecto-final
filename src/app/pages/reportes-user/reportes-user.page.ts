import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RoyaService } from 'src/app/servicios/roya.service';

@Component({
    selector: 'app-reportes-user',
    templateUrl: './reportes-user.page.html',
    styleUrls: ['./reportes-user.page.scss'],
})
export class ReportesUserPage implements OnInit {

    private miGrafico: Chart;
    private miGrafico2: Chart;
    arrayRegistros: any;
    //datos para los gráficos
    siRoya: any;
    noRoya: any;
    roya1 : any;
    roya2 : any;
    roya3 : any;
    roya4 : any;

    //para usuario ingresado
    datosUsario = JSON.parse(localStorage.getItem('sesionlogin'));

    constructor(private royaService: RoyaService) { }

    cargarRegistros(){
    this.royaService.traerRegistrosUsuario(this.datosUsario['id']).then(data=>{
        //this.arrayRegistros = JSON.stringify(data);
        this.arrayRegistros = (data);
        console.log(this.arrayRegistros);
        //llenar datos para la gráfica
        this.noRoya = this.arrayRegistros.filter(valor => valor.presenciaRoya == 0).length;
        this.siRoya = this.arrayRegistros.filter(valor => valor.presenciaRoya == 1).length;
        this.roya1 = this.arrayRegistros.filter(valor => valor.nivelRoya == 1).length;
        this.roya2 = this.arrayRegistros.filter(valor => valor.nivelRoya == 2).length;
        this.roya3 = this.arrayRegistros.filter(valor => valor.nivelRoya == 3).length;
        this.roya4 = this.arrayRegistros.filter(valor => valor.nivelRoya == 4).length;
        
        //llenar gráficos
        this.graficoCirculo();
        this.grafico();
    }).catch(error =>{
        console.log(error);
    });
}

    ngOnInit() {
    this.cargarRegistros();
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

//     grafico(){
//     const ctx = document.getElementById('chart');
//     this.miGrafico = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Si roya', 'No roya'],
//             datasets: [{
//                 label: 'My First Dataset',
//                 data: [this.siRoya, this.noRoya,0],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(75, 192, 192, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(75, 192, 192, 1)'
//                 ],
//                 borderWidth: 1
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
