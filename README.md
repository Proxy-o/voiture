## Installation Instructions

To set up the Project locally, follow these steps:


Clone the Repository:

```bash
git clone https://github.com/Proxy-o/voiture.git
```

Enter the folder

```bash
cd voiture
```

Install node dependencies:

```bash
npm i
```

Replace the DATABASE_URL with  your  mysql database url in the .env file 

# note : 
if you have docker  just run the following command  to start a mysql container

```bash
./start-mysqlDatabase.sh 
```


and then run :

```bash
npx prisma migrate dev --name init
```


Run the app

```bash
npm run build && npm run start
```


Open your prefered browser and Enter :
http://localhost:3000
