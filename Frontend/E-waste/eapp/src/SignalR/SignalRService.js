import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7289/orderHub") 
    .withAutomaticReconnect() 
    .build();

export default connection;