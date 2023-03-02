import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  private socket:any;

  constructor() {

    this.socket = io(environment.wsUrl);
    this.checkStatus();

   }

   checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }

  emit( evento: string , payload?: any, callback?: ()=>{}){
    console.log('emitiendo ',payload);
    //emit(evento, payload, callback)
    this.socket.emit( evento, payload, callback );

  }

  // listen( evento: string) {

  //   return this.socket.fromEvent(evento);

  // }
  listen(event: string): Observable<any> {
    console.log('listen called'); // agregar mensaje de depuración
    return new Observable((subscriber) => {
      this.socket.on(event, (data:any) => {
        subscriber.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
