import { Injectable } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage( mensaje: string ){
    console.log('sendMessage::: ', mensaje);

    const payload = {
      de: 'Fernado',
      cuerpo: mensaje
    }

    this.wsService.emit('mensaje', payload)
  }

  getMessages(){
    return this.wsService.listen('nuevo')
  }
}
