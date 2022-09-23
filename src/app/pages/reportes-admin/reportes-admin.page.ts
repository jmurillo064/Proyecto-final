import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-reportes-admin',
    templateUrl: './reportes-admin.page.html',
    styleUrls: ['./reportes-admin.page.scss'],
})
export class ReportesAdminPage implements OnInit {

    private miGrafico: Chart;
    private miGrafico2: Chart;
    constructor() { }

    ngOnInit() {
        this.grafico();
        this.graficoCirculo();
    }

    grafico(){
        const ctx = document.getElementById('chart');
        this.miGrafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0', '1', '2', '3', '4', '5'],
                datasets: [{
                    label: false,
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
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

    graficoCirculo(){
        const ctx = document.getElementById('chartCirculo');
        this.miGrafico2 = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'Red',
                    'Blue'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 4
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
                    text: 'Presencia de Roya',
                }
            }
        });
    }

}
