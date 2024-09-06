import { PrismaClient } from '@prisma/client';
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

// Helper function to calculate flight duration
function calculateDuration(departureTime: Date, arrivalTime: Date): string {
  const diffMs = Math.abs(arrivalTime.getTime() - departureTime.getTime());
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours}h ${diffMinutes}m`;
}

async function main() {
  // Seed Roles
  const passengerRole = await prisma.roles.create({
    data: {
      id: 'rol_j5qH4zLOtuC8moNu',
      type: 'passenger',
    },
  });

  const agentRole = await prisma.roles.create({
    data: {
      id: 'rol_tIDQk5we8QH1eGq6',
      type: 'agent',
    },
  });

  // Seed Airlines
  const airline1 = await prisma.airlines.create({
    data: {
      id: uuidv4(),
      name: 'Thai Airways International',
      phone: '123-456-7890',
    },
  });

  const airline2 = await prisma.airlines.create({
    data: {
      id: uuidv4(),
      name: 'Bangkok Airways',
      phone: '098-765-4321',
    },
  });

  // Seed Airports
  const airport1 = await prisma.airports.create({
    data: {
      id: uuidv4(),
      name: 'Suvarnabhumi Airport (BKK)',
      code: 'SA-BKK',
      city: 'Bangkok',
    },
  });

  const airport2 = await prisma.airports.create({
    data: {
      id: uuidv4(),
      name: 'Don Mueang International Airport',
      code: 'DMI-BKK',
      city: 'Bangkok',
    },
  });

  //airport type
  await prisma.airportTypes.createMany({
    data: [
      {
        id: uuidv4(),
        airportId: airport1.id,
        type: 'domestic',
      },
      {
        id: uuidv4(),
        airportId: airport1.id,
        type: 'international',
      },
      {
        id: uuidv4(),
        airportId: airport2.id,
        type: 'domestic',
      },
      {
        id: uuidv4(),
        airportId: airport2.id,
        type: 'international',
      },
    ],
  });

  // Seed Flights
  const flight1 = await prisma.flights.create({
    data: {
      id: uuidv4(),
      airlineId: airline1.id,
      flightNumber: 'TG101',
    },
  });

  const flight2 = await prisma.flights.create({
    data: {
      id: uuidv4(),
      airlineId: airline2.id,
      flightNumber: 'PG102',
    },
  });

  // Seed Flight Schedules
  const departureTime1 = new Date('2024-12-01T10:00:00Z');
  const arrivalTime1 = new Date('2024-12-01T12:00:00Z');
  const duration1 = calculateDuration(departureTime1, arrivalTime1);

  const departureTime2 = new Date('2024-12-02T15:00:00Z');
  const arrivalTime2 = new Date('2024-12-02T18:00:00Z');
  const duration2 = calculateDuration(departureTime2, arrivalTime2);

  await prisma.flightSchedules.createMany({
    data: [
      {
        id: uuidv4(),
        flightId: flight1.id, // Use flight_id reference
        type: 'domestic',
        depatureAirportId: airport1.id,
        arrivalAirportId: airport2.id,
        depatureDate: departureTime1,
        arrivalDate: arrivalTime1,
        depatureTime: departureTime1,
        arrivalTime: arrivalTime1,
        duration: duration1,
        unitPrice: 100,
      },
      {
        id: uuidv4(),
        flightId: flight2.id, // Use flight_id reference
        type: 'international',
        depatureAirportId: airport2.id,
        arrivalAirportId: airport1.id,
        depatureDate: departureTime2,
        arrivalDate: arrivalTime2,
        depatureTime: departureTime2,
        arrivalTime: arrivalTime2,
        duration: duration2,
        unitPrice: 200,
      },
    ],
  });

  // //
  console.log('Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
