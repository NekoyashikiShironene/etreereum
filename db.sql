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

CREATE TABLE Item (
    itemId      INT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price       INT NOT NULL,
    imageUrl    VARCHAR(255) NOT NULL
);

CREATE TABLE Redemption (
    redemptionId  INT PRIMARY KEY AUTO_INCREMENT,
    walletAddress VARCHAR(50) NOT NULL,  
    itemId        INT NOT NULL,
    redeemedAt    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (itemId) REFERENCES Item(itemId)
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


-- 
INSERT INTO Planting (treeId, typeId, ownerAddress, latitude, longitude, treeImageUrl, validationStatus) VALUES
(500123, 1001, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 37.77490000, -122.41940000, 'http://localhost:3000/default.jpg', 0),
(500456, 1003, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 34.05220000, -118.24370000, 'http://localhost:3000/default.jpg', 0),
(500789, 1005, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 40.71280000, -74.00600000, 'http://localhost:3000/default.jpg', 0),
(501111, 1007, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 51.50740000, -0.12780000, 'http://localhost:3000/default.jpg', 0),
(501222, 1009, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 48.85660000, 2.35220000, 'http://localhost:3000/default.jpg', 0),
(501555, 1002, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', -33.86880000, 151.20930000, 'http://localhost:3000/default.jpg', 0),
(501789, 1004, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', -22.90680000, -43.17290000, 'http://localhost:3000/default.jpg', 0),
(502000, 1006, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 35.68950000, 139.69170000, 'http://localhost:3000/default.jpg', 0),
(502333, 1008, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 55.75580000, 37.61730000, 'http://localhost:3000/default.jpg', 0),
(502666, 1010, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 19.43260000, -99.13320000, 'http://localhost:3000/default.jpg', 0);

INSERT INTO Item (itemId, title, description, price, imageUrl) VALUES
(1001, 'Bamboo Water Bottle', 'Sustainable bamboo water bottle that keeps your drinks at the perfect temperature.', 200, '/placeholder.svg?height=200&width=400'),
(1002, 'Organic Tote Bag', '100% organic cotton tote bag, perfect for shopping and reducing plastic waste.', 150, '/placeholder.svg?height=200&width=400'),
(1003, 'Metal Straw Set', 'Reusable metal straws with cleaning brush to help reduce single-use plastic.', 100, '/placeholder.svg?height=200&width=400'),
(1004, 'Eco-Friendly Notebook', 'Notebook made from recycled paper, perfect for jotting down ideas sustainably.', 120, '/placeholder.svg?height=200&width=400'),
(1005, 'Solar-Powered Charger', 'Portable solar charger to keep your devices powered with renewable energy.', 600, '/placeholder.svg?height=200&width=400');

INSERT INTO Redemption (redemptionId, walletAddress, itemId) VALUES
(100001, "0x3A3593FacB8Aa2Fc4157C9C1EC1C540373920A47", 1001),
(100002, "0x3A3593FacB8Aa2Fc4157C9C1EC1C540373920A47", 1002)

