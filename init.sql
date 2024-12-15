-- Create a table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Insert predefined data
INSERT INTO users (username, email) VALUES
('adam', 'adam.flitney@gmail.com'),
('amy', 'amyflitney@gmail.com');