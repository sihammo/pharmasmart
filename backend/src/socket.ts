import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Pharmacies join a room representing their pharmacyId
    socket.on("join_pharmacy", (pharmacyId: string) => {
      console.log(`🏥 Socket ${socket.id} joined pharmacy room: ${pharmacyId}`);
      socket.join(pharmacyId);
    });

    // Patients join a room representing their patientId
    socket.on("join_patient", (patientId: string) => {
      console.log(`👤 Socket ${socket.id} joined patient room: ${patientId}`);
      socket.join(patientId);
    });

    // Doctors join a room representing their doctorId
    socket.on("join_doctor", (doctorId: string) => {
      console.log(`🥼 Socket ${socket.id} joined doctor room: ${doctorId}`);
      socket.join(doctorId);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
