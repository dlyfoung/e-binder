package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func SetupDb() {

	// Define MySQL connection parameters
	// TODO: move to somewhere else
	dsn := "myuser:mypassword@tcp(localhost:3306)/ebinder"

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal("Failed to connect to DB:", err)
	}

	executeDb(db, `
		CREATE TABLE IF NOT EXISTS source (
			id INT AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(255) NOT NULL,
			url VARCHAR(512) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`)

	defer db.Close()
}

func executeDb(db *sql.DB, sql string) {
	_, err := db.Exec(sql)

	if err != nil {
		log.Fatalf("Failed to execute sql: %s", sql)
	}
}
