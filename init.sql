SET
    NAMES 'utf8mb4';

CREATE TABLE
    specialties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color_code VARCHAR(50)
    );

CREATE TABLE
    levels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        rank_order INT NOT NULL
    );

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        level_id INT,
        status ENUM ('Active', 'Onboarding', 'Inactive') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (level_id) REFERENCES levels (id)
    );

CREATE TABLE
    competencies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        specialty_id INT,
        FOREIGN KEY (specialty_id) REFERENCES specialties (id)
    );

CREATE TABLE
    user_specialties (
        user_id INT,
        specialty_id INT,
        PRIMARY KEY (user_id, specialty_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (specialty_id) REFERENCES specialties (id) ON DELETE CASCADE
    );

CREATE TABLE
    user_competencies (
        user_id INT,
        competency_id INT,
        percent_completed FLOAT,
        PRIMARY KEY (user_id, competency_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (competency_id) REFERENCES competencies (id) ON DELETE CASCADE
    );

INSERT INTO
    levels (name, rank_order)
VALUES
    ('Analista', 1),
    ('Consultor', 2),
    ('Consultor Sr.', 3),
    ('Manager', 4),
    ('Director', 5),
    ('Partner', 6);

INSERT INTO
    specialties (name, color_code)
VALUES
    ('Estrategia', 'oklch(48.8% 0.243 264.376)'),
    ('Tecnología', 'oklch(59.6% 0.145 163.225)'),
    ('SAP', 'oklch(66.6% 0.179 58.318)'),
    ('Auditoría', 'oklch(57.7% 0.245 27.325)'),
    ('Riesgos', 'oklch(55.8% 0.288 302.321)');

INSERT INTO
    competencies (name, specialty_id)
VALUES
    ('Análisis de datos', 1),
    ('Gestión de proyectos', 1),
    ('Transformación digital', 1),
    ('Desarrollo de software', 2),
    ('Arquitectura de sistemas', 2),
    ('Ciberseguridad', 2),
    ('Implementación de SAP', 3),
    ('Optimización de procesos', 3),
    ('Integración de sistemas', 3),
    ('Auditoría financiera', 4),
    ('Auditoría de sistemas', 4),
    ('Auditoría de cumplimiento', 4),
    ('Gestión de riesgos', 5),
    ('Evaluación de riesgos', 5),
    ('Mitigación de riesgos', 5);

INSERT INTO
    users (full_name, email, level_id, status)
VALUES
    (
        'Juan Pérez',
        'juan.perez@example.com',
        1,
        'Active'
    ),
    (
        'María Sánchez',
        'maria.sanchez@example.com',
        2,
        'Active'
    ),
    (
        'Carlos López',
        'carlos.lopez@example.com',
        2,
        'Active'
    ),
    (
        'Ana Martínez',
        'ana.martinez@example.com',
        3,
        'Active'
    ),
    (
        'Luis Rodríguez',
        'luis.rodriguez@example.com',
        1,
        'Active'
    ),
    (
        'Sofía Gómez',
        'sofia.gomez@example.com',
        4,
        'Active'
    ),
    (
        'Miguel Fernández',
        'miguel.fernandez@example.com',
        6,
        'Active'
    ),
    (
        'Laura Sánchez',
        'laura.sanchez@example.com',
        5,
        'Active'
    ),
    (
        'Diego Ramírez',
        'diego.ramirez@example.com',
        5,
        'Active'
    ),
    (
        'María García',
        'maria.garcia@example.com',
        2,
        'Active'
    ),
    (
        'Lucía Torres',
        'lucia.torres@example.com',
        3,
        'Active'
    ),
    (
        'Jorge Díaz',
        'jorge.diaz@example.com',
        6,
        'Active'
    ),
    (
        'Sara Gómez',
        'sara.gomez@example.com',
        1,
        'Active'
    ),
    (
        'Andrés Martínez',
        'andres.martinez@example.com',
        4,
        'Active'
    ),
    (
        'Marta Rodríguez',
        'marta.rodriguez@example.com',
        3,
        'Active'
    ),
    (
        'David López',
        'david.lopez@example.com',
        5,
        'Active'
    ),
    (
        'Isabel Fernández',
        'isabel.fernandez@example.com',
        6,
        'Active'
    ),
    (
        'Pablo García',
        'pablo.garcia@example.com',
        2,
        'Active'
    ),
    (
        'Carla Martínez',
        'carla.martinez@example.com',
        3,
        'Active'
    );

INSERT INTO
    user_specialties (user_id, specialty_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 3),
    (3, 2),
    (3, 4),
    (4, 3),
    (4, 5),
    (5, 4),
    (5, 1),
    (6, 5),
    (6, 2),
    (7, 1),
    (7, 4),
    (8, 2),
    (8, 3),
    (9, 3),
    (9, 5),
    (10, 4),
    (10, 1),
    (11, 5),
    (11, 2),
    (12, 1),
    (12, 3),
    (13, 2),
    (13, 4),
    (14, 3),
    (14, 5),
    (15, 4),
    (15, 1),
    (16, 5),
    (16, 2),
    (17, 1),
    (17, 3),
    (18, 2),
    (18, 4),
    (19, 3),
    (19, 5);

INSERT INTO
    user_competencies (user_id, competency_id, percent_completed)
VALUES
    (1, 1, 85.0),
    (1, 3, 25.0),
    (2, 2, 42.0),
    (3, 3, 63.0),
    (3, 5, 95.0),
    (4, 4, 5.0),
    (5, 5, 35.0);