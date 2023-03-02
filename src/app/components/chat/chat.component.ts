import { ChatService } from './../../services/chat.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],

})
export class ChatComponent implements OnInit, OnDestroy {

  texto = ''
  mensajesSubscription!: Subscription
  elemento: HTMLElement | null = null;

  mensajes: any[] = [];

  constructor(
    public chatService:ChatService
    ){

  }
  ngOnInit(){

   /*  this.chatService.getMessages().subscribe((mensaje: any) => {
      console.log('mensaje recibido:', mensaje);
    }); */
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubscription = this.chatService.getMessages().subscribe( msg => {

      this.mensajes.push( msg );

      setTimeout(() => {
        if (this.elemento)
          this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });

  }
  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  enviar(){
    if(this.texto.trim().length ===0) return
    console.log("estoy en la funcion enviar",this.texto)
    this.chatService.sendMessage(this.texto)
    this.texto = ''
  }
}
