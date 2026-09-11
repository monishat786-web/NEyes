import sqlite3

DB_NAME = "database/screening.db"


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    # Patient details
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS patients (
            patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            gender TEXT,
            phone TEXT,
            language TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Screening details and AI result
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS screenings (
            screening_id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            image_path TEXT,
            blur_score REAL,
            brightness_score REAL,
            contrast_score REAL,
            retinal_visibility TEXT,
            image_quality TEXT,
            dr_result TEXT,
            confidence REAL,
            ai_not_sure INTEGER DEFAULT 0,
            gradcam_path TEXT,
            high_risk INTEGER DEFAULT 0,
            screening_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
        )
    """)

    # Screening reminders
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reminders (
            reminder_id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            reminder_date TEXT,
            reminder_type TEXT,
            status TEXT DEFAULT 'Pending',
            FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
        )
    """)

    # Offline screening / synchronization
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS offline_sync (
            sync_id INTEGER PRIMARY KEY AUTOINCREMENT,
            screening_id INTEGER NOT NULL,
            patient_id INTEGER NOT NULL,
            sync_status TEXT DEFAULT 'Pending',
            saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            synced_at TIMESTAMP,
            FOREIGN KEY (screening_id) REFERENCES screenings(screening_id),
            FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
        )
    """)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_tables()
    print("SQLite database and tables created successfully!")