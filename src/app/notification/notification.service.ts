import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private hubConnection: signalR.HubConnection;

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5000/notificationHub') // Your hub URL
            .build();

        this.hubConnection.start().catch((err) => console.error(err));

        this.hubConnection.on('ReceiveNotification', (message) => {
            // Handle the received notification
            console.log('Notification received:', message);
        });
    }
}
