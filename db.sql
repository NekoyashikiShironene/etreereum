CREATE TABLE User (
    walletAddress VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE Tree (
    treeId VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255),
    value FLOAT
);

CREATE TABLE Planting (
    treeId VARCHAR(255),
    ownerId VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    treeUrl VARCHAR(255) NOT NULL,
    plantedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validationStatus BIT DEFAULT 0,
    PRIMARY KEY (treeId, ownerId, plantedAt),
    FOREIGN KEY (treeId) REFERENCES Tree(treeId),
    FOREIGN KEY (ownerId) REFERENCES User(walletAddress)
);

INSERT INTO Tree (treeId, type, value) VALUES 
('T001', 'Takhian Thong', 25.4), 
('T002', 'Siamese Rosewood', 23.7),
('T003', 'Burma Padauk', 22.5),
('T004', 'Teak', 21.8),
('T005', 'Yang Na', 20.6),
('T006', 'Makha Mong', 19.9),
('T007', 'Burmese Sal', 18.5),
('T008', 'Lagerstroemia', 17.2),
('T009', 'White Siris', 16.7),
('T010', 'Pink Shower Tree', 15.3);


