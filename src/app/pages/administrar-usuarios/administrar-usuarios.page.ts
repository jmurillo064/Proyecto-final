import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.page.html',
  styleUrls: ['./administrar-usuarios.page.scss'],
})
export class AdministrarUsuariosPage implements OnInit {

  arrayUsuarios: any = [];

  constructor(
    private personService: PersonaService, 
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.personService.traerUsuarios().then(data=>{
      this.arrayUsuarios = data['data'];
      console.log(this.arrayUsuarios);
    }).catch(error =>{
      console.log(error);
    });
  }

}
