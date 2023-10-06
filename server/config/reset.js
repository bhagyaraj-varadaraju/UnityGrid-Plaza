import { pool } from "./database.js";
import eventData from "../data/events.js";
import locationData from "../data/locations.js";
import dotenv from 'dotenv'

dotenv.config({ path: '../.env'})

const createLocationTable = async () => {
  const createLocationTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE IF NOT EXISTS locations (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            address VARCHAR(255) NOT NULL,
            img_url VARCHAR(255) NOT NULL
        )
    `;
  
    try {
    const res = await pool.query(createLocationTableQuery);
    console.log("🎉 locations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating locations table", err);
  }
};

const createEventsTable = async () => {
  const createEventsTableQuery = `
      DROP TABLE IF EXISTS events;
  
      CREATE TABLE IF NOT EXISTS events (
          id NUMERIC PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          date VARCHAR(10) NOT NULL,
          time VARCHAR(10) NOT NULL,
          location_id VARCHAR(255) NOT NULL,
          img_url  TEXT NOT NULL,
          FOREIGN KEY (location_id) REFERENCES locations(id)
      )
  `;

  try {
    const res = await pool.query(createEventsTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
  }
};

const seedLocationTable = async () => {
  await createLocationTable();

  locationData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO locations (id, name, address, img_url) VALUES ($1, $2, $3, $4)",
    };

    const values = [
      location.id,
      location.name,
      location.address,
      location.img_url,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting location", err);
        return;
      }

      console.log(`✅ ${location.name} added successfully`);
    });
  });
};

const seedEventTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (id, name, date, time, location_id, img_url) VALUES ($1, $2, $3, $4, $5, $6)",
    };

    const values = [
      event.id,
      event.name,
      event.date,
      event.time,
      event.location_id,
      event.img_url
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return;
      }

      console.log(`✅ ${event.name} added successfully`);
    });
  });
};

const seedDatabase = async () => {
  await seedLocationTable();
  await seedEventTable();
};

seedDatabase();
