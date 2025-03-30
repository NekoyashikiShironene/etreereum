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
    validationStatus INT DEFAULT 0,
    FOREIGN KEY (typeId) REFERENCES Tree(typeId)
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






-- Delete table
DROP TABLE Planting;
DROP TABLE Redemption;
DROP TABLE Tree;
DROP TABLE Item;


-- 
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

INSERT INTO Planting (treeId, typeId, ownerAddress, latitude, longitude, treeImageUrl, validationStatus) VALUES
(500001, 1001, '0x6de2591e6014481082a5a07bfe4d1b138a3f92d6', 37.77490000, -122.41940000, 'http://localhost:3000/default.jpg', 0);

INSERT INTO Item (itemId, title, description, price, imageUrl) VALUES
(1001, 'Bamboo Water Bottle', 'Sustainable bamboo water bottle that keeps your drinks at the perfect temperature.', 200, 'http://localhost:3000/items/1001.jpg'),
(1002, 'Organic Tote Bag', '100% organic cotton tote bag, perfect for shopping and reducing plastic waste.', 150, 'http://localhost:3000/items/1002.jpg'),
(1003, 'Metal Straw Set', 'Reusable metal straws with cleaning brush to help reduce single-use plastic.', 100, 'http://localhost:3000/items/1003.jpg'),
(1004, 'Eco-Friendly Notebook', 'Notebook made from recycled paper, perfect for jotting down ideas sustainably.', 120, 'http://localhost:3000/items/1004.jpg'),
(1005, 'Solar-Powered Charger', 'Portable solar charger to keep your devices powered with renewable energy.', 600, 'http://localhost:3000/items/1005.png'),
(1006, 'Recycled Notebook', '100% recycled paper notebook for sustainable note-taking.', 120, '/items/1006.jpg'),
(1007, 'Solar Power Bank', 'Charge your devices with solar energy, perfect for outdoor use.', 600, '/items/1007.jpg'),
(1008, 'Bamboo Toothbrush Set', 'Set of 4 eco-friendly bamboo toothbrushes.', 80, 'http://localhost:3000/items/1008.jpg'),
(1009, 'Eco-Friendly Coffee Cup', 'Reusable coffee cup made from biodegradable material.', 150, '/items/1009.jpg'),
(1010, 'Organic Cotton Towel', 'Soft organic cotton towel, perfect for daily use.', 250, 'http://localhost:3000/items/1010.jpg'),
(1011, 'Reusable Silicone Food Wrap', 'An alternative to plastic wrap, keeps food fresh.', 180, 'http://localhost:3000/items/1011.jpg'),
(1012, 'Stainless Steel Lunchbox', 'Keep your meals warm with this durable lunchbox.', 350, 'http://localhost:3000/items/1012.jpg'),
(1013, 'Handmade Coconut Bowl', 'Handcrafted coconut shell bowl with a wooden spoon.', 200, 'http://localhost:3000/items/1013.jpg'),
(1014, 'Bee Wax Food Wrap', 'Eco-friendly food wrap made from organic beeswax.', 170, 'http://localhost:3000/items/1014.jpg'),
(1015, 'Eco Yoga Mat', 'Sustainable yoga mat made from biodegradable materials.', 700, 'http://localhost:3000/items/1015.jpg');

INSERT INTO Redemption (redemptionId, walletAddress, itemId) VALUES
(100001, "0x3A3593FacB8Aa2Fc4157C9C1EC1C540373920A47", 1001),
(100002, "0x3A3593FacB8Aa2Fc4157C9C1EC1C540373920A47", 1002)

