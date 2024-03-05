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

# note :

if you have <strong>DOCKER</strong> just run the following command to start a mysql container

```bash
./start-mysqlDatabase.sh
```

If NOT replace the DATABASE_URL with your mysql database url in the .env file

and then run :

```bash
npx prisma migrate dev --name init
```

seed some data to log in

```bash
npm run db:seed
```

Run the app

```bash
npm run build && npm run start
```

Open your prefered browser and Enter :
http://localhost:3000

you can login with

<h1>admin</h1>
<h1>admin123</h1>
