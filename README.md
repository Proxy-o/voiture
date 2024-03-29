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

## if you have <strong>DOCKER</strong> just run the following command to start a mysql container

```bash
./start-mysqlDatabase.sh
```

If NOT replace the DATABASE_URL with your mysql database url in the .env file

and then run :

```bash
npx prisma migrate dev --name init
```
if you get Error: P1017: Server has closed the connection.
wait until the container is fully functional


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

# To login as an admin

User name : _`admin`_
<br />
Password : _`admin123`_

# To login as a User

User name : _`user`_
<br />
Password : _`user123`_
