### Prerequisites
- node: 12.xx
- express: 4.16
- yarn

### Start development server

```shell
$ yarn start
```

### Start development server with docker

first make image 
```bash
$ docker build -t <image-name:tag> .
```


```shell
$ docker run  -itd --name <container name> --env NODE_ENV=development -p 3000:3000 <image-name:tag>
```


After starting the server
go to [`http://localhost:3000`](http://localhost:3000)