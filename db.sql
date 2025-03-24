CREATE TABLE User (
    walletAddress VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE Tree (
    typeId INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255),
    value FLOAT
);

CREATE TABLE Planting (
    treeId INT PRIMARY KEY AUTO_INCREMENT,
    typeId INT(255),
    ownerAddress VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    treeImageUrl VARCHAR(255) NOT NULL,
    plantedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validationStatus BIT DEFAULT 0,
    FOREIGN KEY (typeId) REFERENCES Tree(typeId),
    FOREIGN KEY (ownerAddress) REFERENCES User(walletAddress)
);

INSERT INTO Tree VALUES 
(1001, 'Takhian Thong', 25.4), 
(1002, 'Siamese Rosewood', 23.7),
(1003, 'Burma Padauk', 22.5),
(1004, 'Teak', 21.8),
(1005, 'Yang Na', 20.6),
(1006, 'Makha Mong', 19.9),
(1007, 'Burmese Sal', 18.5),
(1008, 'Lagerstroemia', 17.2),
(1009, 'White Siris', 16.7),
(1010, 'Pink Shower Tree', 15.3);

INSERT INTO Planting (treeId, typeId, latitude, longitude, treeImageUrl, plantedAt, validationStatus) 
VALUES
(1000001, 1001, 13.756331, 100.501762, 'https://example.com/tree1.jpg', '2024-03-24 10:15:00', 1),
(1000002, 1002, 14.123456, 101.654321, 'https://example.com/tree2.jpg', '2024-03-23 09:30:00', 0),
(1000003, 1003, 15.987654, 102.456789, 'https://example.com/tree3.jpg', '2024-03-22 14:45:00', 1),
(1000004, 1001, 16.543210, 103.123456, 'https://example.com/tree4.jpg', '2024-03-21 16:20:00', 1),
(1000005, 1002, 17.876543, 104.987654, 'https://example.com/tree5.jpg', '2024-03-20 08:00:00', 0);


-- Delete table
DROP TABLE Planting;
DROP TABLE User;
DROP TABLE Tree;

